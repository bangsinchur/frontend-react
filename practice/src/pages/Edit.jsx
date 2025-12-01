import { useNavigate, useParams } from "react-router-dom";
import Button from "../component/Button";
import Editor from "../component/Editor";
import Header from "../component/Header";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import useCurDiary from "../hooks/useCurDiary";

export default function Edit() {
  const nav = useNavigate();
  const params = useParams();

  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);

  const initData = useCurDiary(params.id);

  const onSubmit = (input) => {
    onUpdate(params.id, input.createdDate, input.emotionId, input.content);
    nav("/", { replace: true });
  };

  return (
    <div className="Edit">
      <Header
        leftChild={<Button onClick={() => nav("/")} text={"<뒤로가기"} />}
        title={"일기 수정하기"}
        rightChild={
          <Button
            onClick={() => {
              onDelete(params.id);
              nav("/", { replace: true });
            }}
            text={"삭제하기"}
            type={"NEGATIVE"}
          />
        }
      />
      <Editor initData={initData} onSubmit={onSubmit} />
    </div>
  );
}
