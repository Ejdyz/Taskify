"use client"
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { signIn } from "next-auth/react"
import {Button} from "@heroui/button"
const TodoListCard = () => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
      <button onClick={() => signIn("google")}></button>  
      </CardHeader>
      <CardBody>
      <Button onClick={() => signIn("google")}></Button>  
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <CardFooter>
        
        </CardFooter>
    </Card>
  );
}
 
export default TodoListCard;