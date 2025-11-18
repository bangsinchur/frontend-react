import { useRef, useState } from "react";
import "./Editor.css";

const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      //엔터키 눌렀을때 submit함수 호출
      onSubmit();
    }
  };

  const onSubmit = () => {
    contentRef.current.focus();
    if (content === "") {
      return;
    }
    onCreate(content);
    setContent(""); //입력창 초기화
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        onKeyDown={onKeydown}
        value={content}
        onChange={onChangeContent}
        placeholder="새로운 Todo..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
