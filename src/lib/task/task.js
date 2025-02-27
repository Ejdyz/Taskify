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

export const getTaskInfo = async (taskId, userId) => {
    const info = await prisma.task.findFirst({
        select: {
            id: true,
            createdAt: true,
            title: true,
            tasks: { 
                select: {
                    content: true,
                    isMarked: true,
                }
            },
            author: {
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            },
            contributors: {
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            },
        },
        where: {
            id: taskId,
            OR: [ {
                authorId: userId
            }, {
                contributors: {
                    some: {
                        id: userId,
                    }
                }
            }]
        }
    });
    
    if (info === null)
        return null;

    return info;
}

export const createSubTasks = async (parentTaskId, subTasks) => {
    const subtasks = await prisma.subTask.createMany({
        data: subTasks.map(subTask => ({
            content: subTask.content,
            isMarked: subTask.isMarked,
            taskId: parentTaskId,
        }))
    });

    return subtasks;
};


export const getAllUserTasks = async (userId) => {

    if (userId === null)
        return null;

    const tasks = await prisma.task.findMany({
        where: {
            OR: [{
                authorId: userId,
            }, {
                contributors: {
                    some: {
                        id: userId
                    }
                }
            }]
        },
        select: {
            id: true,
            // isFavorite
            createdAt: true,
            updatedAt: true,
            title: true,
            tasks: {
                select: {
                    content: true,
                    isMarked: true,
                }
            },
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
        orderBy: {
            createdAt: 'desc',
        }
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
