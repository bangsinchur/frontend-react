import getEmotionImg from "../util/get-emotion-img";
import "./EmotionItem.css";

export default function EmotionItem({
  onClick,
  emotionId,
  emotionName,
  isSeleted,
}) {
  return (
    <div
      onClick={onClick}
      className={`EmotionItem ${
        isSeleted ? `EmotionItem_on_${emotionId}` : ""
      }`}
    >
      <img className="emotion_img" src={getEmotionImg(emotionId)} />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
}
