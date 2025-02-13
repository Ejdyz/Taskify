import DottedBackground from "../lib/DottedBackground";
import TodoListCard from "./TodoListCard";

const MainPage = ({session}) => {
  return (     
    <DottedBackground>
      <div className="w-full h-full flex flex-col items-center justify-center flex-wrap">
        <TodoListCard />
      </div>
    </DottedBackground> 
  );
}
 
export default MainPage;