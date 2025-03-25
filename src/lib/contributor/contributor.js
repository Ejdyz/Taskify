import prisma from "../prisma/prisma";

export const addContributor = async (taskId, contributorEmail) => {
    try {
        const task = await prisma.task.update({
            where: { 
                id: taskId 
            },
            data: {
                contributors: {
                    connect: { 
                        email: contributorEmail 
                    }
                }
            }
        });

        return !!task;
    } catch (error) {
        console.error("Error adding contributor:", error);
        return false;
    }
};

export const removeContributor = async (taskId, contributorEmail) => {
    try {
        const task = await prisma.task.update({
            where: { 
                id: taskId 
            },
            data: {
                contributors: {
                    disconnect: { 
                        email: contributorEmail 
                    }
                }
            }
        });

        return !!task;
    } catch (error) {
        console.error("Error removing contributor:", error);
        return false;
    }
};