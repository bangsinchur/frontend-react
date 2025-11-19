import { memo, useContext } from "react";
import "./TodoItem.css";
import { TodoDispatchContext } from "../App";

const TodoItem = ({ id, isDone, content, date }) => {
  const { onDelete, onUpdate } = useContext(TodoDispatchContext);
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onDeleteContent = () => {
    onDelete(id);
  };
  return (
    <div className="TodoItem">
      <input onChange={onChangeCheckbox} type="checkbox" checked={isDone} />
      <div className="content">{content}</div>
      <div className="date">
        {new Date(date).toLocaleDateString()}{" "}
        {new Date(date).toLocaleDateString("ko-KR", { weekday: "short" })}
      </div>
      <button onClick={onDeleteContent}>삭제</button>
    </div>
  );
};

export default memo(TodoItem);
