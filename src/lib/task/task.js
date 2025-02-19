import prisma from "../prisma/prisma";
import { getUserIdFromSessionToken } from "../user/user";

export const createTask = async (taskTitle, subTasks) => {

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

export const createSubTasks = async (parentTaskId, subTasks) => {
    return subTasks.forEach(async (t) => {
        const subtask = await prisma.subTask.create({
            data: {
                content: t.value,
                isMarked: t.isMarked,
                taskId: parentTaskId
            }
        });
    });
}

export const getAllUserTasks = async () => {

    const authorId = await getUserIdFromSessionToken();

    if (authorId === null)
        return null;

    const tasks = await prisma.task.findMany({
        select: {
            id: true,
            // isFavorite
            updatedAt: true,
            title: true,
            tasks: true,
            author: {
                select: {
                    name: true,
                    email: true,
                    image: true,
                }
            },
            contributors: true,
        },
        where: {
            authorId: authorId
        },
    });

    return tasks
}