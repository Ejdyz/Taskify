import { useState } from 'react'
import { Checkbox  } from '@heroui/checkbox'
import { addToast } from "@heroui/toast"
import { useRouter } from "next/navigation"

export default function TaskView({tasks}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  async function handleCheckboxChange(taskId, e) {
    setLoading(true)
    try {
      const response = await fetch(`/api/task/mark`, {
        method: 'POST',
        body: JSON.stringify({ 
          goalId: taskId,
          isMarked: e.target.checked
        })
      })

      const res = await response.json()

      if (!res.success) {
        addToast({title: res.message, color: 'danger'})
      }else{
        console.log("Task updated")
      }

    } catch (error) {
      addToast({title: "An error occurred", color: 'danger'})
      console.error(error)
    }
    router.refresh()
    setLoading(false)
  };

  return (
    <div className='flex flex-col gap-2 lg:w-1/3 md:w-2/3 w-full lg:max-w-1/3 md:max-w-2/3 max-w-full px-4'>
      {tasks.map((task, index) => (
          <div className="flex gap-2 w-full" key={task.id}>
            <Checkbox
              isDisabled={loading}
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
