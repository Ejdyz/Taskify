"use client"
// Hooks
import { useState, useRef } from "react";
import { addToast } from "@heroui/toast";
import { notFound, useRouter } from "next/navigation";
// Components
import { Button } from "@heroui/button";
import { Tab, Tabs } from "@heroui/tabs";
import MenuBar from "@/components/navigation/MenuBar";
import { Input } from "@heroui/input";
import GoalsEditForm from "@/components/lib/GoalsEditForm";
import TaskView from "./TaskView";
import AddContributorsModal from "./AddContributorsModal";
import RemoveTaskModal from "./RemoveTaskModal";
//Icons
import { TrashIcon, ArrowLeftIcon, MultipleUsersIcon, TaskListIcon, PenIcon } from "@/components/icons/Icons";

export default function TaskWrapper({ task, sessionUserId }) {
  const [mode, setMode] = useState("view");
  
  const startingTasks = task.tasks.map((task, index) => ({ id: index, ...task }))
  const tasksRef = useRef(startingTasks);
  const newTasksRef = useRef(startingTasks);
  const router = useRouter();

  const [title, setTitle] = useState(task.title || "Untitled");
  const [loading, setLoading] = useState(false);

  function handleUpdateTitle(e) {
    setTitle(e.target.value);
  };

  function handleUpdateTaskRef(tasks) {
    newTasksRef.current = tasks;
  }

  async function handleTaskEditSubmit () {
    setLoading(true)
    try {
      const response = await fetch(`/api/task/edit`, {
        method: 'POST',
        body: JSON.stringify({ 
          id: task.id,
          title,
          tasks: newTasksRef.current
        })
      })

      const res = await response.json()

      if (res.success) {
        console.log("Task updated")
        tasksRef.current = newTasksRef.current;
      }else{
        addToast({title: res.message, color: 'danger'})
        setTitle(task.title || "Untitled");
      }
      
    } catch (error) {
      addToast({title: "An error occurred", color: 'danger'})
      console.error(error)
    }
    setLoading(false)
    router.refresh()
  }

  async function handleTabChange(tab) {
    if (tab === "view") {
      await handleTaskEditSubmit(title, tasksRef.current)
    }
    setMode(tab);
  }

  function handleMarkTask (taskId, isMarked) {
    const newTasks = tasksRef.current.map(task => {
      if (task.id === taskId) {
        task.isMarked = isMarked
      }
      return task
    })
    tasksRef.current = newTasks
  }

  return (
    <div className="w-full h-screen dotted-vignette fixed overflow-auto">
      <div className="flex flex-col items-center gap-4 w-full mb-20">
        <MenuBar>
          <Button as="a" href="/" variant="flat" isIconOnly>
            <ArrowLeftIcon />
          </Button>
          <Input
            placeholder="Untitled"
            value={title}
            onChange={handleUpdateTitle}
            variant="bordered"
            isReadOnly={mode === "view"}
            className="w-1/3 text-center"
            classNames={{
              input: "text-center font-semibold text-xl",
              inputWrapper: "border-0 hover:border-0"
            }}
          />
          <div className="flex gap-4">
            <Tabs onSelectionChange={handleTabChange} selectedKey={mode}>
              <Tab key="view" title={<TaskListIcon />} />
              <Tab key="edit" title={<PenIcon />} />
            </Tabs>
            {task.author.id === sessionUserId &&
              <AddContributorsModal
                taskId={task.id}
                contributors={task.contributors}
                variant="flat"
                color="primary"
                className="font-bold"
                isIconOnly
              >
                <MultipleUsersIcon />
              </AddContributorsModal>}
            {task.author.id === sessionUserId &&
              <RemoveTaskModal
                taskId={task.id}
                redirect="/"
                variant="flat"
                isIconOnly
                color="danger"
              >
                <TrashIcon />
              </RemoveTaskModal>
            }
          </div>
        </MenuBar>
        {mode === "view"
          ? <TaskView
            tasks={tasksRef.current}
            handleMarkTask={handleMarkTask}
          />
          : <GoalsEditForm
            startingTasks={tasksRef.current}
            handleUpdateTaskRef={handleUpdateTaskRef}
          />
        }
      </div>
    </div>
  )
}
