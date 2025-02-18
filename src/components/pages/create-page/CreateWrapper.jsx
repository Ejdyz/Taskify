"use client"
// Hooks
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
// Components
import MenuBar from "@/components/navigation/MenuBar";
import GoalsEditForm from "@/components/lib/GoalsEditForm";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
// Icons
import { TickIcon, ArrowLeftIcon } from "@/components/icons/Icons";

export default function CreateWrapper() {
  const router = useRouter();
  const startingTasks = [{ id: 1, value: "", isMarked: false },{ id: 2, value: "", isMarked: false },{ id: 3, value: "", isMarked: false }]
  const tasksRef = useRef(startingTasks);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  function handleUpdateTitle(e) {
    setTitle(e.target.value);
  };

  function handleUpdateTaskRef(tasks) {
    tasksRef.current = tasks;
  }

  async function handleSubmit (tasks) {      

    if(tasks.some((task) => task.value.trim() === "")){
      alert("Please fill all the tasks");
      return;
    }
    
    setLoading(true);

    const data = { title: title || "Untitled", tasks };

    try {
      
      const response = await fetch("/api/task/create", {
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
            onPress={() => handleSubmit(tasksRef.current)}
            color="success"
            variant="shadow"
            className="font-bold"
            endContent={<TickIcon />}
          >
            Submit
          </Button>
        </MenuBar>
        <GoalsEditForm startingTasks={startingTasks} handleUpdateTaskRef={handleUpdateTaskRef} />
      </div>
    </div>
  );
}