import "./DiaryList.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import { useContext, useState } from "react";
import { DiaryStateContext } from "../App";

export default function DiaryList() {
  const nav = useNavigate();
  const data = useContext(DiaryStateContext);
  const [sortData, setSortData] = useState("latest");

  const onChangeSortData = (e) => {
    setSortData(e.target.value);
  };

  const getSortedData = () => {
    return data.toSorted((a, b) => {
      if (sortData === "latest") {
        return Number(b.createdDate) - Number(a.createdDate);
      } else {
        return Number(a.createdDate) - Number(b.createdDate);
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortData}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav(`/new`)}
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
        />
      </div>
      <div>
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
