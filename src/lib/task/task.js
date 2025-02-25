import prisma from "../prisma/prisma";
import { getUserIdFromSessionToken } from "../user/user";

export const createTask = async (taskTitle, subTasks) => {

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

export const createSubTasks = async (parentTaskId, subTasks) => {
    return subTasks.forEach(async (t) => {
        const subtask = await prisma.subTask.createMany({
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
        include: {
            subTasks: true
        },
        where: {
            authorId: authorId
        },
    });

    return tasks
}
export const editTask = async (taskId, taskTitle, subTasks) => {
    
    const task = await prisma.task.updateMany({
        where: {
            id: taskId
        },
        data: {
            name: taskTitle
        }
    });

    await prisma.subTask.deleteMany({
        where: {
            taskId: taskId
        }
    });

    await createSubTasks(taskId, subTasks);

    return task;
}
