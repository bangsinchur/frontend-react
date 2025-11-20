import { useParams } from "react-router-dom";
import "./Diary.css";

const Diary = () => {
  const params = useParams();

  return <div>{params.id} 번 일기 입니다.~~~</div>;
};

export default Diary;
