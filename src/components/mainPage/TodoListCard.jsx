"use client"
import { useState } from "react"
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card"
import { Avatar, AvatarGroup } from "@heroui/avatar"
import { ScrollShadow } from "@heroui/scroll-shadow"
import { Checkbox } from "@heroui/checkbox"
import { HeartIcon, HeartAddOutlinedIcon } from "../icons/Icons"
import { Tooltip } from "@heroui/tooltip"

const TodoListCard = ({list}) => {
  const [isFavorite, setIsFavorite] = useState(list.isFavorite)

  return (
    <Card className="w-full select-none hover:scale-105 cursor-pointer" >
      <CardHeader className="flex justify-between items-center">
        <div className="flex flex-col items-start">
          <h3 className="font-semibold text-xl">{list.title}</h3>
          <p className="text-gray-500 text-xs">{list.updatedAt}</p>
        </div>
        <div className="cursor-pointer" onClick={() => setIsFavorite((prev)=> !prev)} >
          {isFavorite 
            ? <HeartIcon color={"red"} />
            : <HeartAddOutlinedIcon />
          }
        </div>
        </CardHeader>
      <CardBody>
        <ScrollShadow className="max-h-48 h-full overflow-hidden">
          {list.tasks.map((task, index) => {
            return(
              <div className="flex gap-2" key={index}>
                <Checkbox isReadOnly isSelected={task.isMarked}>{task.title}</Checkbox>
              </div>
            )
          })}
          </ScrollShadow>
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <Avatar isBordered size="sm" color="primary" src={list.author.image} />
        <AvatarGroup size="sm" isBordered max={3}>
          {list.coauthors.map((coauthor) => (
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