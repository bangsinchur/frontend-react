import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function useCurDiary(id) {
  const nav = useNavigate();
  const [curDiaryData, setCurDiaryData] = useState();
  const data = useContext(DiaryStateContext);

  useEffect(() => {
    const CurrentDiaryData = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!CurrentDiaryData) {
      window.alert("해당 일기가 존재하지 않습니다.");
      nav("/", { replace: true });
    }
    setCurDiaryData(CurrentDiaryData);
  }, [id]);

  return curDiaryData;
}
