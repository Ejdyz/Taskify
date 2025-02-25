import React from 'react'
import { Checkbox  } from '@heroui/checkbox'

export default function TaskView({tasks}) {

  function handleCheckboxChange(taskId, e) {
    // handleTaskChange(taskId, "isMarked", e.target.checked);
  };

  return (
    <div className='flex flex-col gap-2 lg:w-1/3 md:w-2/3 w-full lg:max-w-1/3 md:max-w-2/3 max-w-full px-4'>
      {tasks.map((task, index) => (
          <div className="flex gap-2 w-full" key={task.id}>
            <Checkbox
              size="lg"
              defaultChecked={task.isMarked}
              isSelected={task.isMarked}
              onChange={(e) => handleCheckboxChange(task.id, e)}
              className={"text-md w-1/3 " + (task.isMarked && task.content.trim() !== ""? 'line-through' : '')}
            >
              <pre className='font-sans font-medium w-96 whitespace-pre-wrap break-words  '>
                {task.content}
              </pre>
            </Checkbox>
          </div>
        ))}
    </div>
  )
}
