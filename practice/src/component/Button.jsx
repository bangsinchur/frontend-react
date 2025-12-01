import "./Button.css";

export default function Button({ onClick, text, type }) {
  return (
    <>
      <button onClick={onClick} className={`Button Button_${type}`}>
        {text}
      </button>
    </>
  );
}
