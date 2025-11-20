import "./Home.css";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(), //오늘자 기준 "년"
    pivotDate.getMonth(), //오늘자 기준 "월"
    1, //해당 월의 "1일"
    0, //0시
    0, //0분
    0 //0초 의 데이터를 만듦
  ).getTime(); // TimeStemp (숫자값)형식으로 저장

  const endTime = new Date(
    pivotDate.getFullYear(), // 오늘자 기준 "년"
    pivotDate.getMonth() + 1, //오늘자 기준 다음 "월"
    0, // 0으로 설정하면 전달의 마지막 "일"
    23, //23시
    59, //59분
    59 //59초
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);

  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);
  console.log(monthlyData);

  const onIncreaeMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaeMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaeMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaeMonth} text={">"} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
