"use client"
// Hooks
import { useRouter } from "next/navigation";
import { useState } from "react";
// Components
import MenuBar from "@/components/navigation/MenuBar";
import TasksForm from "./TasksForm";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
// Icons
import { TickIcon, ArrowLeftIcon, PlusIcon } from "@/components/icons/Icons";

export default function CreateWrapper() {
  const router = useRouter();
  const [tasks, setTasks] = useState([{ id: 1, value: "", isMarked: false },{ id: 2, value: "", isMarked: false },{ id: 3, value: "", isMarked: false }]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  function handleUpdateTitle(e) {
    setTitle(e.target.value);
  };

  function handleAddTask() {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), value: "", isMarked: false }
    ]);
  };

  function handleTaskChange(taskId, field, value) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, [field]: value } : t))
    );
  }

  function handleRemoveTask(taskId) {
    if (tasks.length === 1) return;
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  async function handleSubmit () {      

    if(tasks.some((task) => task.value.trim() === "")){
      alert("Please fill all the tasks");
      return;
    }
    
    setLoading(true);

    const data = { title: title || "Untitled", tasks };

    try {
      
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      const res = await response.json();
      
      setLoading(false);
      
      if(!res.success){
        alert(res.message);
      }
      
      router.push("/");
      
    } catch (error) {
      alert("An error occurred while submitting the form");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen dotted-vignette fixed overflow-auto">
      <div className="flex flex-col items-center gap-4 w-full mb-20">
        <MenuBar>
          <Button as="a" href="/" variant="flat" isIconOnly>
            <ArrowLeftIcon />
          </Button>
          <Input
            placeholder="Untitled"
            onChange={handleUpdateTitle}
            variant="bordered"
            className="w-1/3 text-center"
            classNames={{
              input: "text-center font-semibold text-xl",
              inputWrapper: "border-0 hover:border-0"
            }}
          />
          <Button
            onPress={handleSubmit}
            color="success"
            variant="shadow"
            className="font-bold"
            endContent={<TickIcon />}
          >
            Submit
          </Button>
        </MenuBar>
        <TasksForm tasks={tasks} onTaskChange={handleTaskChange} onRemoveTask={handleRemoveTask} />
        <Button onPress={handleAddTask} variant="flat" color="primary" startContent={<PlusIcon />}>
          Add Task
        </Button>
      </div>
    </div>
  );
}