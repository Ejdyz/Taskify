"use client"
// Hooks
import { useState } from "react"
import { useRouter } from "next/navigation"
// Components
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card"
import { Avatar, AvatarGroup } from "@heroui/avatar"
import { ScrollShadow } from "@heroui/scroll-shadow"
import { Checkbox } from "@heroui/checkbox"
import FavoriteButton from "./FavoriteButton"
import { Tooltip } from "@heroui/tooltip"
import RemoveTaskModal from "@/components/pages/task-page/RemoveTaskModal"
// Icons
import {HeartAddOutlinedIcon, HeartIcon, TrashIcon } from "@/components/icons/Icons"
// Utils
import { formatDateToCzech } from "@/components/lib/utils"

const TodoListCard = ({ list }) => {
  console.log(list)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleRedirect = () => {
    router.push(`/task/${list.id}`)
  }

  return (
    <Card className="w-full select-none hover:scale-95 cursor-pointer" onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
      <CardHeader className="flex justify-between items-center">
        <div onClick={handleRedirect} className="flex flex-col items-start w-full">
          <h3 className="font-semibold text-xl">{list.title}</h3>
          <p className="text-gray-500 text-xs">{formatDateToCzech(list.updatedAt || list.createdAt)}</p>
        </div>
        <div className="cursor-pointer ml-2" >
          {isHovered && (
            <div className="flex gap-1 pr-1 items-center">
              <RemoveTaskModal 
                taskId={list.id}
                variant="light"
                isIconOnly
                size="sm"
                color="danger" >
                <TrashIcon />
              </RemoveTaskModal>
              <FavoriteButton taskId={list.id} isDefaultFavorite={list.userFavorited}/>
            </div>
          )}
          {!isHovered &&  <>
            {list.userFavorited
              ? <HeartIcon color={"red"} />
              : <HeartAddOutlinedIcon />}
            </>
          }
        </div>
      </CardHeader>
      <CardBody onClick={handleRedirect}>
        <ScrollShadow className="max-h-48 h-full overflow-hidden">
          {list.tasks.map((task, index) => {
            return (
              <div className="flex gap-2" key={index}>
                <Checkbox isDisabled isSelected={task.isMarked}>{task.content}</Checkbox>
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