import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Viewer from "../components/Viewer";
import useCurData from "../hooks/useCurData";
import getFormatDate from "../util/getFormatDate";

export default function Diary() {
  const params = useParams();
  const nav = useNavigate();
  const initData = useCurData(params.id);

  if (!initData) {
    return <div>로딩중 ...</div>;
  }

  const { createdDate, emotionId, content } = initData;
  return (
    <div>
      <Header
        title={getFormatDate(new Date(createdDate))}
        leftChild={<Button onClick={() => nav(-1)} text={"<뒤로가기"} />}
        rightChild={
          <Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
}
