import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

export default function useCurData(id) {
  const [initData, setInitData] = useState();
  const data = useContext(DiaryStateContext);

  useEffect(() => {
    const CurrentData = data.find((item) => String(item.id) === String(id));

    if (!CurrentData) {
      return;
    }

    setInitData(CurrentData);
  }, [id]);

  return initData;
}
