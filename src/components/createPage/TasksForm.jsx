"uset client"
// Components
import { Textarea } from '@heroui/input'
import { Checkbox  } from '@heroui/checkbox'
import { Button } from '@heroui/button'
// Icons
import { TrashIcon } from '../icons/Icons'

export default function TasksForm({ tasks, onTaskChange, onRemoveTask }) {
  const handleCheckboxChange = (taskId, e) => {
    onTaskChange(taskId, "isMarked", e.target.checked);
  };

  const handleTaskValueChange = (taskId, e) => {
    onTaskChange(taskId, "value", e.target.value);
  };

  return (
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
            className={task.isMarked && task.value.trim() !== ""? 'line-through' : ''}
            classNames={{input: "text-md"}}
            value={task.value}
            onChange={(e) => handleTaskValueChange(task.id, e)}
          />
          <Button
            isDisabled={tasks.length === 1}
            isIconOnly
            color="danger"
            variant="flat"
            onPress={() => onRemoveTask(task.id)}
          >
            <TrashIcon />
          </Button>
        </div>
      ))}
    </div>
  );
}