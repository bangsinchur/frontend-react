import { useNavigate } from "react-router-dom";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";
import { useState } from "react";

export default function DiaryList({ data }) {
  const nav = useNavigate();

  const [sortedValue, setSortedValue] = useState("latest");

  const onSelectButton = (e) => {
    setSortedValue(e.target.value);
  };

  const getSortedData = () => {
    return data.toSorted((a, b) => {
      if (sortedValue === "latest") {
        return b.createdDate - a.createdDate;
      } else {
        return a.createdDate - b.createdDate;
      }
    });
  };

  const SortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onSelectButton}>
          <option value={"latest"}>최신 순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
        />
      </div>
      {SortedData.map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
}
