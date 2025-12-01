import { useEffect, useState } from "react";
import { getEmotionList } from "../util/getEmotionList";
import "./Editor.css";
import EmotionItem from "./EmotionItem";
import { getStringedDate } from "../util/getStringDate";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Editor({ initData, onSubmit }) {
  const nav = useNavigate();
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });
  useEffect(() => {
    if (initData) {
      setInput({ ...initData, createdDate: new Date(initData.createdDate) });
    }
  }, [initData]);

  const onInputValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({ ...input, [name]: value });
  };

  const onSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section>
        <h4>오늘의 날짜</h4>
        <input
          onChange={onInputValue}
          name="createdDate"
          type="date"
          value={getStringedDate(input.createdDate)}
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {getEmotionList.map((item) => (
            <EmotionItem
              onClick={() => {
                onInputValue({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                });
              }}
              key={item.emotionId}
              {...item}
              isSelected={input.emotionId === item.emotionId}
            />
          ))}
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          onChange={onInputValue}
          value={input.content}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button_section">
        <Button onClick={() => nav("/")} text={"취소하기"} />
        <Button onClick={onSubmitButton} text={"작성완료"} type={"POSITIVE"} />
      </section>
    </div>
  );
}
