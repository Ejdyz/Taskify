import prisma from "./prisma/prisma";
import { getSession } from "./session/session";

export const createTask = async (taskTitle: string, subTasks: object[], authorId: string) => {

    getSession();
    
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