import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
const TodoListCard = () => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">HeroUI</p>
          <p className="text-small text-default-500">heroui.com</p>
        </div>
      </CardHeader>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <CardFooter>
        
        </CardFooter>
    </Card>
  );
}
 
export default TodoListCard;