// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
// Components
import { addToast } from "@heroui/toast";
import { Button } from "@heroui/button";
// Icons
import { HeartAddOutlinedIcon, HeartIcon } from "@/components/icons/Icons";

export default function FavoriteButton({taskId, isDefaultFavorite}) {
  const [isFavorite, setIsFavorite] = useState(isDefaultFavorite);
  const router = useRouter()

  const handleMarkTaskFavorite = async (isFavorite) => {
    try {
      const response = await fetch(`/api/task/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          taskId: taskId,
          isFavorite: isFavorite
        })
      })

      const res = await response.json()
      if (!res.success) {
        addToast({title: res.message, color:"danger"})
        setIsFavorite(!isFavorite)
      }else{
        setIsFavorite(isFavorite)
      }
      
    } catch (error) {
      console.error(error)
      addToast({title: "An error occurred while marking task as favorite", color: 'danger'})
    }
    router.refresh()
  }

  return (
    <Button
      variant="light"
      isIconOnly
      size="sm"
      onPress={() => handleMarkTaskFavorite(!isFavorite)}
    >

      {isFavorite
        ? <HeartIcon color={"red"} />
        : <HeartAddOutlinedIcon />
      }
    </Button>
  )
}
