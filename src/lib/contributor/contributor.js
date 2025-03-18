import prisma from "../prisma/prisma";
import { getUserIdFromSessionToken } from "../user/user";

export const addContributor = async (taskTitle, subTasks) => {

    const authorId = await getUserIdFromSessionToken();

    if (authorId === null)
        return null;
    
    const task = await prisma.task.create({
        data: {
            title: taskTitle,
            authorId: authorId,
        }
    });

    await createSubTasks(task.id, subTasks);
    
    return task;
}
