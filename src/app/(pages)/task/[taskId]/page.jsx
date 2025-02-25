// Utils
import { notFound } from 'next/navigation'
// Components
import TaskWrapper from '@/components/pages/task-page/TaskWrapper';
import { getTaskInfo } from "@/lib/task/task"
export default async function page(props) {
  const params = await props.params;
  const taskId = params.taskId;

  // Check if task exists
  if (!taskId) {
    notFound();
  }

  // Fetch task data
  const task = await getTaskInfo(taskId);

  if (!task) {
    notFound();
  }


  return <TaskWrapper task={task} />   
}
