import { useState } from 'react'
import { Checkbox  } from '@heroui/checkbox'
import { addToast } from "@heroui/toast"
import { useRouter } from "next/navigation"
export default function SubTaskCheckbox({task, handleMarkTask}) {
  const [isMarked, setIsMarked] = useState(task.isMarked)
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  async function handleCheckboxChange(taskId, e) {
    setLoading(true)
    setIsMarked(e.target.checked)
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
        setIsMarked(!e.target.checked)
      }else{
        console.log("Task updated")
        handleMarkTask(taskId, e.target.checked)
      }

    } catch (error) {
      addToast({title: "An error occurred", color: 'danger'})
      setIsMarked(!e.target.checked)
      console.error(error)
    }
    router.refresh()
    setLoading(false)
  };

  return (
    <Checkbox
      isDisabled={loading}
      size="lg"
      isSelected={isMarked}
      onChange={(e) => handleCheckboxChange(task.id, e)}
      className={"text-md w-1/3 " + (task.isMarked && task.content.trim() !== ""? 'line-through' : '')}
    >
      <pre className='font-sans font-medium w-96 whitespace-pre-wrap break-words  '>
        {task.content}
      </pre>
    </Checkbox>
  )
}
