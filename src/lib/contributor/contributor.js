import prisma from "../prisma/prisma";

export const addContributor = async (taskId, contributorEmail) => {
    
    const user = await prisma.user.findUnique({ 
        where: {
            email: contributorEmail
        }
    });

    if (user)
    {
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

        if (task)
            return true;
        else
            return false;
    }

    return false;
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