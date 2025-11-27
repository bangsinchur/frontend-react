import "./DiaryItem.css";
import getEmotionImg from "../util/get-emotion-img";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function DiaryItem({ id, createdDate, emotionId, content }) {
  const nav = useNavigate();
  return (
    <div className="DiaryItem">
      <section
        onClick={() => nav(`/diary/${id}`)}
        className={`img_section img_section_${emotionId}`}
      >
        <img src={getEmotionImg(emotionId)} />
      </section>
      <section onClick={() => nav(`/diary/${id}`)} className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        {/* new Date로 감싸야 하는지?  */}
        <div className="content">{content}</div>
      </section>
      <section className="button_section">
        <Button
          onClick={() => {
            nav(`/edit/${id}`);
          }}
          text={"수정하기"}
        />
      </section>
    </div>
  );
}
