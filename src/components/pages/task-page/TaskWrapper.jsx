"use client"
// Hooks
import { useState, useRef } from "react";
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

export default function TaskWrapper({ task }) {
  const [mode, setMode] = useState("view");

  const startingTasks = task.tasks.map((task, index) => ({ id: index, ...task }))
  const tasksRef = useRef(startingTasks);

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  function handleUpdateTitle(e) {
    setTitle(e.target.value);
  };

  function handleUpdateTaskRef(tasks) {
    tasksRef.current = tasks;
  }

  function handleTaskEditSubmit () {
    console.log("sent")
  }

  function handleTabChange(tab) {
    if (tab === "view") {
      handleTaskEditSubmit()
    }
    setMode(tab);
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
            <AddContributorsModal
              contributors={task.contributors}
              variant="flat"
              color="primary"
              className="font-bold"
              isIconOnly
            >
              <MultipleUsersIcon />
            </AddContributorsModal>
            <RemoveTaskModal
              variant="flat"
              isIconOnly
              color="danger"
            >
              <TrashIcon />
            </RemoveTaskModal>
          </div>
        </MenuBar>
        {mode === "view"
          ? <TaskView
            tasks={tasksRef.current}
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
