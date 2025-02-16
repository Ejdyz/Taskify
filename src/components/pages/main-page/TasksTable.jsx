"use client"
// Components
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import { Avatar, AvatarGroup } from "@heroui/avatar";
import { User } from "@heroui/user";
// Icons
import { HeartIcon, HeartAddOutlinedIcon } from "@/components/icons/Icons";

export default function TasksTable({tasks}) {
  return (
    <Table className="md:w-3/4 w-full px-3 " aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className="w-1/2">Title</TableColumn>
        <TableColumn>Last update</TableColumn>
        <TableColumn>Author</TableColumn>
        <TableColumn>Contributors</TableColumn>
        <TableColumn>Favorite</TableColumn>
      </TableHeader>
      <TableBody items={tasks}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.lastUpdate}</TableCell>
            <TableCell>
              <User name={item.author.name} description={item.author.email} avatarProps={{ src: item.author.image }}></User>
            </TableCell>
            <TableCell>
              <AvatarGroup>
                {item.contributors.map((contributor) => (
                  <Avatar name={contributor.name} src={contributor.image} key={contributor.email} />
                ))}
              </AvatarGroup>
              </TableCell>
            <TableCell>
              {item.isFavorite 
                ? <HeartIcon color={"red"} />
                : <HeartAddOutlinedIcon />
              }
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
