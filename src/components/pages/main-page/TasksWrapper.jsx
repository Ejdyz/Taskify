"use client"
// Components
import { Button } from "@heroui/button";
import { Tab, Tabs } from "@heroui/tabs";
import TodoListCard from "./TaskCard";
import MenuBar from "../../navigation/MenuBar";
//Icons
import { GridIcon, ListIcon, HeartIcon, HeartSlashIcon, UnlimitedIcon, MenuBoardIcon, PlusIcon } from "@/components/icons/Icons";

export default function TasksWrapper({lists}) {
  return (
    <div className="w-full h-screen dotted-vignette fixed overflow-auto">
      <div className="flex flex-col items-center gap-4 w-full mb-20">
        <MenuBar>
          <Button as="a" href="/create" color="primary" variant="shadow" className="font-bold" startContent={<PlusIcon />} endContent={<MenuBoardIcon />} >Create</Button>
          <div className="flex gap-4">
            <Tabs>
              <Tab key="All" title={<UnlimitedIcon className={"size-4"}/>} />
              <Tab key="Favorite" title={<HeartIcon className={"size-4"}/>} />
              <Tab key="Completed" title={<HeartSlashIcon className={"size-4"}/>} />
            </Tabs>
            <Tabs>
              <Tab key="Grid" title={<GridIcon className={"size-4"}/>} />
              <Tab key="List" title={<ListIcon className={"size-4"} />} />
            </Tabs>
          </div>
        </MenuBar>
        <div className="md:w-3/4 w-full md:px-0 px-2 mx-auto h-full [column-count:1] sm:[column-count:2] lg:[column-count:3] gap-4">
          {lists.map((list, index) => (
            <div key={index} className="break-inside-avoid mb-4">
              <TodoListCard list={list} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
