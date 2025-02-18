// Utils
import { auth } from "@/lib/auth/auth"
// Components
import LandingPage from "@/components/pages/landing-page/LandingPage";
import TasksWrapper from "@/components/pages/main-page/TasksWrapper";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <LandingPage />
    );
  }

  const lists = [
    {
      id: "A1B2C3D4qE5F6G7H8I9J0",
      isFavorite: false,
      updatedAt: "2023-05-15 14:30:00",
      title: "Project Alpha",
      tasks: [
        { title: "Define scope", isMarked: true },
        { title: "Research market", isMarked: false },
        { title: "Create prototype", isMarked: false },
        { title: "Gather feedback", isMarked: true }
      ],
      author: {
        name: "Alice Johnson",
        email: "alice@example.com",
        image: "https://i.pravatar.cc/150?u=a04258114e29026302d"
      },
      contributors: [
        { name: "Bob Smith", email: "bob@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
        { name: "Charlie Brown", email: "charlie@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" }
      ]
    },{
      id: "A1B2C3D4E5F6bG7H8I9Ja0",
      isFavorite: false,
      updatedAt: "2023-05-15 14:30:00",
      title: "Project Alpha",
      tasks: [
        { title: "Define scope", isMarked: true },
        { title: "Research market", isMarked: false },
        { title: "Create prototype", isMarked: false },
        { title: "Gather feedback", isMarked: true }
      ],
      author: {
        name: "Alice Johnson",
        email: "alice@example.com",
        image: "https://i.pravatar.cc/150?u=a04258114e29026302d"
      },
      contributors: [
        { name: "Bob Smith", email: "bob@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
        { name: "Charlie Brown", email: "charlie@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" }
      ]
    },{
      id: "A1B2C3D4E5sF6G7H8Iv9J0",
      isFavorite: false,
      updatedAt: "2023-05-15 14:30:00",
      title: "Project Alpha",
      tasks: [
        { title: "Define scope", isMarked: true },
        { title: "Research market", isMarked: false },
        { title: "Create prototype", isMarked: false },
        { title: "Gather feedback", isMarked: true }
      ],
      author: {
        name: "Alice Johnson",
        email: "alice@example.com",
        image: "https://i.pravatar.cc/150?u=a04258114e29026302d"
      },
      contributors: [
        { name: "Bob Smith", email: "bob@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
        { name: "Charlie Brown", email: "charlie@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" }
      ]
    },{
      id: "A1B2C3D4hE5F6Ga7H8I9J0",
      isFavorite: false,
      updatedAt: "2023-05-15 14:30:00",
      title: "Project Alpha",
      tasks: [
        { title: "Define scope", isMarked: true },
        { title: "Research market", isMarked: false },
        { title: "Create prototype", isMarked: false },
        { title: "Gather feedback", isMarked: true }
      ],
      author: {
        name: "Alice Johnson",
        email: "alice@example.com",
        image: "https://i.pravatar.cc/150?u=a04258114e29026302d"
      },
      contributors: [
        { name: "Bob Smith", email: "bob@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
        { name: "Charlie Brown", email: "charlie@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" }
      ]
    },{
      id: "A1B2C3Dkjh4E5F6Gs7H8I9J0",
      isFavorite: false,
      updatedAt: "2023-05-15 14:30:00",
      title: "Project Alpha",
      tasks: [
        { title: "Define scope", isMarked: true },
        { title: "Research market", isMarked: false },
        { title: "Create prototype", isMarked: false },
        { title: "Gather feedback", isMarked: true }
      ],
      author: {
        name: "Alice Johnson",
        email: "alice@example.com",
        image: "https://i.pravatar.cc/150?u=a04258114e29026302d"
      },
      contributors: [
        { name: "Bob Smith", email: "bob@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
        { name: "Charlie Brown", email: "charlie@example.com", image: "https://i.pravatar.cc/150?u=a04258114e29026302d" }
      ]
    },
  ];
  
  return (
    <TasksWrapper lists={lists} />
  );
}
