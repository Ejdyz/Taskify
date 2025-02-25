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

export const createSubTasks = async (parentTaskId, subTasks) => {
    console.log(subTasks);

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