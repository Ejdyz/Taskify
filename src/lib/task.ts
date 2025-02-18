import prisma from "./prisma/prisma";

export const createTask = async (taskTitle: string, subTasks: object[], authorId: string) => {

    const task = prisma.task.create({
        data: {
            name: taskTitle,
            description: "",
            authorId: authorId,
            dueDate: new Date()
        }
    });

    return task;
}