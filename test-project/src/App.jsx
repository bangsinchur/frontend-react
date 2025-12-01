import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";
import New from "./pages/New";
import { createContext, useEffect, useReducer, useRef, useState } from "react";

// const mockData = [
//   {
//     id: 1,
//     createdDate: new Date("2025-11-01").getTime(),
//     emotionId: 1,
//     content: "1번 일기장 입니다.",
//   },
//   {
//     id: 2,
//     createdDate: new Date("2025-11-27").getTime(),
//     emotionId: 2,
//     content: "2번 일기장 입니다.",
//   },
//   {
//     id: 3,
//     createdDate: new Date("2025-11-10").getTime(),
//     emotionId: 3,
//     content: "3번 일기장 입니다.",
//   },
// ];

const reducer = (state, action) => {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      nextState = [action.data, ...state];
      break;
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
  }
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [isLoding, setIsLoding] = useState(true);
  const idRef = useRef(0);

  useEffect(() => {
    const getData = localStorage.getItem("diary");
    if (!getData) {
      setIsLoding(false);
      return;
    }
    const parsedData = JSON.parse(getData);
    if (!Array.isArray(parsedData)) {
      setIsLoding(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > Number(maxId)) {
        maxId = item.id;
      }
    });
    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
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
    return <div>로딩중 ...</div>;
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onDelete,
            onUpdate,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/new" element={<New />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
