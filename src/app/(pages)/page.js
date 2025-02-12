import DottedBackground from "@/components/lib/DottedBackground"
import TodoListCard from "@/components/todoList/TodoListCard"

export default function Home() {
  return (
    <DottedBackground>
      <div className="w-full h-full flex flex-col items-center justify-center flex-wrap">
        <TodoListCard />
      </div>
    </DottedBackground>
  );
}
