import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import Diary from "./pages/Diary";
import { createContext, useEffect, useReducer, useRef, useState } from "react";

const reducer = (state, action) => {
  let nextstate;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      nextstate = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextstate = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextstate = state.filter((item) => String(action.id) !== String(item.id));
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(nextstate));
  return nextstate;
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  const [isLoding, setIsLoding] = useState(true);

  useEffect(() => {
    const getDiaryItem = localStorage.getItem("diary");
    if (!getDiaryItem) {
      setIsLoding(false);
      return;
    }

    const parsedDiaryItem = JSON.parse(getDiaryItem);
    if (!parsedDiaryItem) {
      setIsLoding(false);
      return;
    }

    let maxId = 0;

    data.forEach((item) => {
      if (Number(item.id) > Number(maxId)) {
        maxId = item.id;
      }
    });
    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedDiaryItem,
    });
    setIsLoding(false);
  }, []);

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate: createdDate.getTime(),
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if (isLoding) {
    return <div> 로딩중....</div>;
  }
  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onDelete, onUpdate }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
