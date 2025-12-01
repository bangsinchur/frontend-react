import { useNavigate, useParams } from "react-router-dom";
import Header from "../component/Header";
import { getStringedDate } from "../util/getStringDate";
import Button from "../component/Button";
import Viewer from "../component/Viewer";
import useCurDiary from "../hooks/useCurDiary";

export default function Diary() {
  const nav = useNavigate();
  const params = useParams();

  const CurrentData = useCurDiary(params.id);

  if (!CurrentData) {
    return <div>데이터 로딩중...</div>;
  }

  const { emotionId, content, createdDate } = CurrentData;

  return (
    <div className="Diary">
      <Header
        title={`${getStringedDate(new Date(createdDate))} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={"뒤로 가기"} />}
        rightChild={
          <Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
}
