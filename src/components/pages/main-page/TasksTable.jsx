"use client"
// Hooks
import { useRouter } from "next/navigation"
// Utils
import { formatDateToCzech } from "@/components/lib/utils";
// Components
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import { Avatar, AvatarGroup } from "@heroui/avatar";
import { User } from "@heroui/user";
import { Button } from "@heroui/button";  
import RemoveTaskModal from "../task-page/RemoveTaskModal"
import FavoriteButton from "./FavoriteButton";
// Icons
import { TrashIcon } from "@/components/icons/Icons";

export default function TasksTable({tasks}) {
  const router = useRouter()

  function redirectToItem (taskId){
    router.push(`/task/${taskId}`)
  }

  
  return (
    <Table isStriped className="md:w-3/4 w-full px-3 " aria-label="Example static collection table" onRowAction={(item) => redirectToItem(item)}>
      <TableHeader >
        <TableColumn className="w-1/3">Title</TableColumn>
        <TableColumn>Last update</TableColumn>
        <TableColumn>Author</TableColumn>
        <TableColumn>Contributors</TableColumn>
        <TableColumn>Favorite</TableColumn>
        <TableColumn>Remove</TableColumn>
      </TableHeader>
      <TableBody items={tasks} emptyContent="No tasks found">
        {(item) => (
          <TableRow key={item.id}>
            <TableCell className="cursor-pointer">{item.title}</TableCell>
            <TableCell className="cursor-pointer">{formatDateToCzech(!item.updatedAt? item.createdAt : item.updatedAt)}</TableCell>
            <TableCell className="cursor-pointer">
              <User name={item.author.name} description={item.author.email} avatarProps={{ src: item.author.image }}></User>
            </TableCell>
            <TableCell className="cursor-pointer">
              {item.contributors.length === 0 
                ? <p className="text-gray-500">No contributors</p>
                : (
                  <AvatarGroup>
                    {item.contributors.map((contributor) => (
                      <Avatar name={contributor.name} src={contributor.image} key={contributor.email} />
                    ))}
                  </AvatarGroup>
                )
              }
              </TableCell>
            <TableCell>
              <FavoriteButton taskId={item.id} isDefaultFavorite={item.userFavorited} />
            </TableCell>
            <TableCell>
              <RemoveTaskModal 
                taskId={item.id} 
                variant="light"
                isIconOnly
                size="sm"
                color="danger" >
                <TrashIcon />
              </RemoveTaskModal>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
