// Utils
import { notFound } from 'next/navigation'
// Components
import TaskWrapper from '@/components/pages/task-page/TaskWrapper';
import { image } from '@heroui/theme';
export default async function page(props) {
  const params = await props.params;
  const taskId = params.taskId;

  // Check if task exists
  if (!taskId) {
    notFound();
  }

  // Fetch task data
  const task = {
    id: "A1B2C3D4E5F6G7H8I9J0",
    isFavorite: false,
    updatedAt: "2023-05-15 14:30:00",
    title: "Project Alpha",
    tasks: [
      { value: "Define scope", isMarked: true },
      { value: "Research market", isMarked: false },
      { value: "Create prototype", isMarked: false },
      { value: "Gather feedback", isMarked: true }
    ],
    author: {
      name: "Alice Johnson",
      email: "alice@example.com",
      image: "https://i.pravatar.cc/150?u=a04258114e29026302d"
    },
    contributors: [
      {name: "Bob Smith", email: "bob@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
      {name: "Charlie Brown", email: "charlie@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
      {name: "David Green", email: "david@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
      {name: "Eve White", email: "eve@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
      {name: "Frank Black", email: "frank@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
      { name: "Grace Brown", email: "grace@exmaple.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
      { name: "Harry Green", email: "harry@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
    ]
  }

  if (!task) {
    notFound();
  }


  return <TaskWrapper task={task} />   
}
