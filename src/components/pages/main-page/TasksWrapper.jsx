"use client"
// Hooks
import { useEffect, useState } from "react"
// Components
import { Button } from "@heroui/button"
import { Tab, Tabs } from "@heroui/tabs"
import TodoListCard from "./TaskCard"
import MenuBar from "@/components/navigation/MenuBar"
import TasksTable from "./TasksTable"
//Icons
import { GridIcon, ListIcon, HeartIcon, HeartSlashIcon, UnlimitedIcon, MenuBoardIcon, PlusIcon } from "@/components/icons/Icons"
import { handleClientScriptLoad } from "next/script"

export default function TasksWrapper({ lists }) {
  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState(null)
  const [filterMode, setFilterMode] = useState(null)

  useEffect(() => {
    setMounted(true)
    setViewMode(localStorage.getItem("viewMode") || "grid")
    setFilterMode(localStorage.getItem("filterMode") || "all")
  }, [])

  if (!mounted) return null
  
  const handleViewModeChange = (mode) => {
    localStorage.setItem("viewMode", mode)
    setViewMode(mode)
  }
  
  const handleFilterModeChange = (mode) => {
    localStorage.setItem("filterMode", mode)
    setFilterMode(mode)
  }
  
  const getFilteredList = () => {
    if (filterMode === "all") return lists
    if (filterMode === "favorite") return lists.filter(list => list.userFavorited)
    if (filterMode === "notFavorite") return lists.filter(list => !list.userFavorited)
  }

  return (
    <div className="w-full h-screen dotted-vignette fixed overflow-auto">
      <div className="flex flex-col items-center gap-4 w-full mb-20">
        <MenuBar>
          <Button as="a" href="/create" color="primary" variant="shadow" className="font-bold" startContent={<PlusIcon />} endContent={<MenuBoardIcon />} >Create</Button>
          <div className="flex gap-4">
            <Tabs onSelectionChange={handleFilterModeChange} selectedKey={filterMode} >
              <Tab key="all" title={<UnlimitedIcon className={"size-4"} />} />
              <Tab key="favorite" title={<HeartIcon className={"size-4"} />} />
              <Tab key="notFavorite" title={<HeartSlashIcon className={"size-4"} />} />
            </Tabs>
            <Tabs onSelectionChange={handleViewModeChange} selectedKey={viewMode} >
              <Tab key="grid" title={<GridIcon className={"size-4"} />} />
              <Tab key="list" title={<ListIcon className={"size-4"} />} />
            </Tabs>
          </div>
        </MenuBar>
        {viewMode === "grid" && (
          <div className="w-full">
            {!getFilteredList() || getFilteredList().length === 0 ? <h1 className="text-center font-semibold text-large">No tasks found...</h1>
              : (
                <div className="md:w-3/4 w-full md:px-0 px-2 mx-auto h-full [column-count:1] sm:[column-count:2] lg:[column-count:3] gap-4">
                  {getFilteredList()?.map((list) => (
                    <div key={list.id} className="break-inside-avoid mb-4">
                      <TodoListCard list={list} />
                    </div>))
                  }
                </div>
              )}

          </div>
        )}
        {viewMode === "list" && (
          <TasksTable tasks={getFilteredList()} />
        )}
      </div>
    </div>
  )
}
