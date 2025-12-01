import "./Viewer.css";
import { emotionList } from "../util/emotion-list";
import getEmotionImg from "../util/get-emotion-img";

export default function Viewer({ emotionId, content }) {
  const emotionItem = emotionList.find((item) => item.emotionId === emotionId);

  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img src={getEmotionImg(emotionId)} />
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
}
