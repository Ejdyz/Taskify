import { SubTask, Task } from "@prisma/client";
import prisma from "../prisma/prisma";
import { getUserIdFromSessionToken } from "../user/user";

export const createTask = async (taskTitle: string, subTasks: any[]) => {

    const authorId = await getUserIdFromSessionToken();

    if (authorId === null)
        return null;
    
    const task = await prisma.task.create({
        data: {
            name: taskTitle,
            description: "",
            authorId: authorId,
            dueDate: new Date()
        }
    });

    await createSubTasks(task.id, subTasks);
    
    return task;
}

export const createSubTasks = async (parentTaskId: string, subTasks: any[]) => {
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

export const getAllUserTasks = async (userId: string) => {
    const tasks = await prisma.task.findMany({
        where: {
            authorId: userId
        },
        include: {
            subTasks: true
        }
    });

    return tasks
}