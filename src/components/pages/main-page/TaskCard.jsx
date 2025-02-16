"use client"
// Hooks
import { useState } from "react"
// Components
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card"
import { Avatar, AvatarGroup } from "@heroui/avatar"
import { ScrollShadow } from "@heroui/scroll-shadow"
import { Checkbox } from "@heroui/checkbox"
import { Tooltip } from "@heroui/tooltip"
// Icons
import { HeartIcon, HeartAddOutlinedIcon } from "@/components/icons/Icons"

const TodoListCard = ({list}) => {
  const [isFavorite, setIsFavorite] = useState(list.isFavorite)

  const handleRedirect = () => {
    console.log("Redirect to list")
  }

  return (
    <Card className="w-full select-none hover:scale-95 cursor-pointer" >
      <CardHeader className="flex justify-between items-center">
        <div onClick={handleRedirect} className="flex flex-col items-start w-full">
          <h3 className="font-semibold text-xl">{list.title}</h3>
          <p className="text-gray-500 text-xs">{list.updatedAt}</p>
        </div>
        <div className="cursor-pointer ml-2" onClick={() => setIsFavorite((prev)=> !prev)} >
          {isFavorite 
            ? <HeartIcon color={"red"} />
            : <HeartAddOutlinedIcon />
          }
        </div>
        </CardHeader>
      <CardBody onClick={handleRedirect}>
        <ScrollShadow className="max-h-48 h-full overflow-hidden">
          {list.tasks.map((task, index) => {
            return(
              <div className="flex gap-2" key={index}>
                <Checkbox isDisabled isSelected={task.isMarked}>{task.title}</Checkbox>
              </div>
            )
          })}
          </ScrollShadow>
      </CardBody>
      <CardFooter onClick={handleRedirect} className="flex justify-between items-center">
        <Avatar isBordered size="sm" color="primary" src={list.author.image} />
        <AvatarGroup size="sm" isBordered max={3}>
          {list.contributors.map((coauthor) => (
            <Tooltip delay={1000} showArrow content={coauthor.name} key={coauthor.email}>
              <Avatar name={coauthor.name} size="sm" key={coauthor.email} src={coauthor.image} />
            </Tooltip>
          ))}
        </AvatarGroup>
      </CardFooter>
    </Card>
  )
}

export default TodoListCard