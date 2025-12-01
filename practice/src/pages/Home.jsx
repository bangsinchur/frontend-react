import { useContext, useState } from "react";
import Button from "../component/Button";
import DiaryList from "../component/DiaryList";
import Header from "../component/Header";
import { DiaryStateContext } from "../App";

const getPivotDate = (pivotDate, data) => {
  const prevDate = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const nextDate = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => prevDate <= item.createdDate && item.createdDate <= nextDate
  );
};

export default function Home() {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const increaseButton = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const decreaseButton = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  const filterData = getPivotDate(pivotDate, data);

  return (
    <div>
      <Header
        leftChild={<Button onClick={decreaseButton} text={"<"} />}
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        rightChild={<Button onClick={increaseButton} text={">"} />}
      />
      <DiaryList data={filterData} />
    </div>
  );
}
