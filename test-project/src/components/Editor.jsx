import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./Editor.css";
import EmotionItem from "./EmotionItem";
import getFormatDate from "../util/getFormatDate";
import { useEffect, useState } from "react";
import { emotionList } from "../util/emotion-list";

export default function Editor({ onSubmit, initData }) {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });
  //   const [isSeleted, setIsSeleted] =useState(true)
  const nav = useNavigate();
  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };
  const onSubmitButton = () => {
    onSubmit(input);
   
  };

  return (
    <div className="Editor">
      <section>
        <h4>오늘의 날짜</h4>
        <input
          onChange={onChangeInput}
          type="date"
          name="createdDate"
          value={getFormatDate(input.createdDate)}
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() => {
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                });
              }}
              key={item.emotionId}
              {...item}
              isSeleted={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <textarea
          onChange={onChangeInput}
          name="content"
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
