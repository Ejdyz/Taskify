"uset client"
// Hooks
import { useState, useEffect } from "react";
// Components
import { Textarea } from '@heroui/input'
import { Checkbox  } from '@heroui/checkbox'
import { Button } from '@heroui/button'
// Icons
import { TrashIcon, PlusIcon } from '../icons/Icons'

export default function GoalsEditForm({ startingTasks, handleUpdateTaskRef }) {
  const [tasks, setTasks] = useState(startingTasks);
  
  function handleTaskChange(taskId, field, value) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, [field]: value } : t))
    );
  }
  
  const handleCheckboxChange = (taskId, e) => {
    handleTaskChange(taskId, "isMarked", e.target.checked);
  };

  const handleTaskValueChange = (taskId, e) => {
    handleTaskChange(taskId, "content", e.target.value);
  };
  
  function handleAddTask() {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), content: "", isMarked: false }
    ]);
  };

  function handleRemoveTask(taskId) {
    if (tasks.length === 1) return;
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  useEffect(() => {
    handleUpdateTaskRef(tasks);
  }, [tasks]);

  return (
    <>
      <div className="flex flex-col gap-2 lg:w-1/3 md:w-2/3 w-full px-4">
        {tasks.map((task, index) => (
          <div className="flex gap-2 w-full" key={task.id}>
            <Checkbox
              size="lg"
              defaultChecked={task.isMarked}
              isSelected={task.isMarked}
              onChange={(e) => handleCheckboxChange(task.id, e)}
              />
            <Textarea
              cacheMeasurements
              isClearable
              onClear={() => handleTaskValueChange(task.id, { target: { value: "" } })}
              minRows={1}
              placeholder={"Task " + (index + 1)}
              className={task.isMarked && task.content.trim() !== ""? 'line-through' : ''}
              classNames={{input: "text-md"}}
              value={task.content}
              onChange={(e) => handleTaskValueChange(task.id, e)}
              />
            <Button
              isDisabled={tasks.length === 1}
              isIconOnly
              color="danger"
              variant="flat"
              onPress={() => handleRemoveTask(task.id)}
            >
              <TrashIcon />
            </Button>
          </div>
        ))}
      </div>
      <Button onPress={handleAddTask} variant="flat" color="primary" startContent={<PlusIcon />}>
        Add Task
      </Button>
    </>
  );
}