import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import useCurData from "../hooks/useCurData";

export default function Edit() {
  const params = useParams();
  const nav = useNavigate();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);

  const initData = useCurData(params.id);

  const onSubmit = (input) => {
    onUpdate(input.id, input.createdDate, input.emotionId, input.content);
    nav("/", { replace: true });
  };

  const onDeleteClick = (id) => {
    if ((window, confirm("정말 삭제하시겠습니까? 다시복구되지 않아요!"))) {
      onDelete(id);
      nav(-1, { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button text={"< 뒤로 가기"} />}
        rightChild={
          <Button
            onClick={() => {
              onDeleteClick(params.id);
            }}
            text={"삭제 하기"}
            type={"NEGATIVE"}
          />
        }
      />
      <Editor initData={initData} onSubmit={onSubmit} />
    </div>
  );
}
