import TodoListCard from "./TodoListCard";
import FilterNavbar from "./FilterNavbar";

const MainPage = ({session}) => {
  const lists = JSON.parse(`[
    {
      "id": "A1B2C3D4E5F6G7H8I9J0",
      "isFavorite": false,
      "updatedAt": "2023-05-15 14:30:00",
      "title": "Project Alpha",
      "tasks": [
        { "title": "Define scope", "isMarked": true },
        { "title": "Research market", "isMarked": false },
        { "title": "Create prototype", "isMarked": false },
        { "title": "Gather feedback", "isMarked": true }
      ],
      "author": {
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "image": "https://i.pravatar.cc/150?u=a04258114e29026302d"
      },
      "coauthors": [
        { "name": "Bob Smith", "email": "bob@example.com", "image": "https://i.pravatar.cc/150?u=a04258114e29026702d" },
        { "name": "Charlie Brown", "email": "charlie@example.com", "image": "https://i.pravatar.cc/150?u=a04258114e29026708c" },
        { "name": "Emma Wilson", "email": "emma@example.com", "image": "https://i.pravatar.cc/150?u=a04258a2462d826712d" },
        {"name": "Sophia Martinez", "email": "sophia@example.com","image": "https://i.pravatar.cc/150?u=a042581f4e29026024d"}
      ]
    },
    {
      "id": "Z9Y8X7W6V5U4T3S2R1Q0",
      "isFavorite": true,
      "updatedAt": "2024-01-20 08:45:00",
      "title": "Beta Release Plan",
      "tasks": [
        { "title": "Develop UI", "isMarked": true },
        { "title": "Write documentation", "isMarked": true },
        { "title": "Perform testing", "isMarked": false },
        { "title": "Deploy to staging", "isMarked": false },
        { "title": "Get user feedback", "isMarked": true },
        { "title": "Deploy to staging", "isMarked": false },
        { "title": "Get user feedback", "isMarked": true }
      ],
      "author": {
        "name": "David Lee",
        "email": "david@example.com",
        "image": "https://i.pravatar.cc/150?u=a042581f4e29026704d"
      },
      "coauthors": [
        { "name": "Emma Wilson", "email": "emma@example.com", "image": "https://i.pravatar.cc/150?u=a04258a2462d826712d" }
      ]
    },
    {
      "id": "M1N2B3V4C5X6Z7L8K9J0",
      "isFavorite": false,
      "updatedAt": "2022-11-10 16:20:00",
      "title": "Marketing Strategy",
      "tasks": [
        { "title": "Identify target audience", "isMarked": true },
        { "title": "Run ads", "isMarked": false },
        { "title": "Analyze conversion rates", "isMarked": true },
        { "title": "Adjust strategy", "isMarked": false }
      ],
      "author": {
        "name": "Sophia Martinez",
        "email": "sophia@example.com",
        "image": "https://i.pravatar.cc/150?u=a042581f4e29026024d"
      },
      "coauthors": []
    }
  ]`)
  
  return (     
    <div className="w-full ">
      <div className="dotted-bg fixed" />
      <div className="flex flex-col items-center gap-4 w-full mb-20">
        <FilterNavbar/>
        <div className="md:w-3/4 w-full md:px-0 px-2 mx-auto gap-4 h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {lists.map((list) => (
            <TodoListCard key={list.id} list={list} />
          ))}
        </div>
      </div>
    </div>
  );
}
 
export default MainPage;