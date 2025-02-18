import prisma from "./prisma/prisma";
import { getUserIdFromSessionToken } from "./user/user";

export const createTask = async (taskTitle: string, subTasks: object[]) => {

    const authorId = await getUserIdFromSessionToken();

    if (authorId === null)
        return null;
    
    const task = prisma.task.create({
        data: {
            name: taskTitle,
            description: "",
            authorId: authorId,
            dueDate: new Date()
        }
    });

    return task;
}