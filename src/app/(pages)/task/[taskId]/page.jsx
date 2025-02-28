// Utils
import { notFound } from 'next/navigation'
// Components
import TaskWrapper from '@/components/pages/task-page/TaskWrapper';
import { getTaskInfo } from "@/lib/task/task"
import { auth } from '@/lib/auth/auth';

export const metadata = {
  title: "Task",
  description: "Task page",
  keywords: "Task, page, tasks"
}



export default async function page(props) {
  const session = await auth();
  const params = await props.params;
  const taskId = params.taskId;

  
  // Check if task exists
  if (!taskId) {
    notFound();
  }

  // Fetch task data
  const task = await getTaskInfo(taskId, session.user.id);

  if (!task) {
    notFound();
  }


  return <TaskWrapper task={task} />   
}
