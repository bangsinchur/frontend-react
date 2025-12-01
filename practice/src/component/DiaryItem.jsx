import { useNavigate, useParams } from "react-router-dom";
import getEmotionId from "../util/getEmotionId";
import Button from "./Button";
import "./DiaryItem.css";

export default function DiaryItem({ id, emotionId, content, createdDate }) {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      <section
        onClick={() => nav(`/diary/${id}`)}
        className={`img_section img_section_${emotionId}`}
      >
        <img src={getEmotionId(emotionId)} />
      </section>
      <section onClick={() => nav(`/diary/${id}`)} className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </section>
      <section className="button_section">
        <Button onClick={() => nav(`/edit/${id}`)} text={"수정하기"} />
      </section>
    </div>
  );
}
