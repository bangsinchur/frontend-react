import "./EmotionItem.css";
import getEmotionId from "../util/getEmotionId";

export default function EmotionItem({
  onClick,
  emotionId,
  emotionName,
  isSelected,
}) {
  return (
    <div
      onClick={onClick}
      className={`EmotionItem ${
        isSelected ? `EmotionItem_on_${emotionId}` : ""
      }`}
    >
      <img className="emotion_img" src={getEmotionId(emotionId)} />
      <div>{emotionName}</div>
    </div>
  );
}
