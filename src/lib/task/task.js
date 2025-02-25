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
            dueDate: new Date()
        }
    });

    await createSubTasks(task.id, subTasks);
    
    return task;
}

export const getTaskInfo = async (taskId) => {
    const info = await prisma.task.findFirst({
        select: {
            id: true,
            createdAt: true,
            title: true,
            subtasks: true,
            author: true,
            contributors: true,
        },
        where: {
            id: taskId
        }
    });
}

export const createSubTasks = async (parentTaskId, subTasks) => {
    const subtasks = await prisma.subTask.createMany({
        data: subTasks.map(subTask => ({
            content: subTask.value,
            isMarked: subTask.isMarked,
            taskId: parentTaskId,
        }))
    });

    return subtasks;
};


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
