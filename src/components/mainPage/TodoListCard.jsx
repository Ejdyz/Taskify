"use client"
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Avatar, AvatarGroup} from "@heroui/avatar";

const TodoListCard = () => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader >Title heading</CardHeader>
      <CardBody>
        <p>Card body content</p>
        </CardBody>
      <CardFooter>
      <AvatarGroup size="sm" isBordered max={3} total={6}>
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      </AvatarGroup>
      </CardFooter>
    </Card>
  );
}
 
export default TodoListCard;