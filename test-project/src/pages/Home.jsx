import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header
        title={`${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월`}
        leftChild={<Button text={"<"} />}
        rightChild={<Button text={">"} />}
      />
      <DiaryList />
    </div>
  );
}
