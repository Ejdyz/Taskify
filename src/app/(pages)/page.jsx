// Utils
import { auth } from "@/lib/auth/auth"
// Components
import LandingPage from "@/components/pages/landing-page/LandingPage";
import TasksWrapper from "@/components/pages/main-page/TasksWrapper";
import { getAllUserTasks } from "@/lib/task/task"

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <LandingPage />
    );
  }

  const lists = await getAllUserTasks(session.user.id)
  
  return (
    <TasksWrapper lists={lists} />
  );
}
