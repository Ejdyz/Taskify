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
            contributors: {
                select: {
                    name: true,
                    email: true,
                    image: true,
                }
            },
        },
        where: {
            OR: [{
                authorId: authorId,
            }, {
                contributors: {
                    every: {
                        id: authorId
                    }
                }
            }]
        },
    });

    return tasks
}

export const addContributorToTask = async (contributor, taskId) => {
    if (!contributor || !taskId)
        return null;

    const tasks = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            contributors: {
                upsert: {
                    create: {

                    },
                    update: {
                        
                    }
                }
            }
        }
    });
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
export const removeTask = async (taskId) => {
    const task = await prisma.task.delete({
        where: {
            id: taskId
        }
    });

    return task;
}
