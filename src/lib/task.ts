import { SubTask, Task } from "@prisma/client";
import prisma from "./prisma/prisma";
import { getUserIdFromSessionToken } from "./user/user";

export const createTask = async (taskTitle: string, subTasks: SubTask[]) => {

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

export const createSubTasks = async (parentTaskId: string, subTasks: SubTask[]) => {
    return subTasks.forEach(async (t) => {
        const subtask = await prisma.subTask.createManyAndReturn({
            data: {
                content: t.content,
                isMarked: t.isMarked,
                taskId: parentTaskId
            }
        });
    });
}