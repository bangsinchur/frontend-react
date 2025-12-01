import getEmotionId from "../util/getEmotionId";
import { getEmotionList } from "../util/getEmotionList";
import "./Viewer.css";

export default function Viewer({ emotionId, content }) {
  const emotionItem = getEmotionList.find(
    (item) => item.emotionId === emotionId
  );

  return (
    <div className="Viewer">
      <section>
        <h4>오늘의 감정</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img src={getEmotionId(emotionId)} />
          {emotionItem.emotionName}
        </div>
      </section>
      <section className="content_wrapper">
        <p>{content}</p>
      </section>
    </div>
  );
}
