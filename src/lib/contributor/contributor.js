import prisma from "../prisma/prisma";

export const addContributor = async (taskId, contributorEmail) => {
    const task = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            contributors: {
                connect: {
                    email: contributorEmail,
                }
            }
        }
    });

    console.log(task);

    return task;
}

export const removeContributor = async (taskId, contributorEmail) => {
    const task = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            contributors: {
                disconnect: {
                    email: contributorEmail,
                }
            }
        }
    });

    console.log(task);
    
    return task;
}