import prisma from "../prisma/prisma";
import { getSession } from "../session/session";

export const getUserIdFromSessionToken = async (): Promise<string | null> => {

    const token = (await getSession()).session;

    if (token === null)
        return null;

    const userId = await prisma.session.findUnique({
        where: {
            sessionToken: token
        },
        select: {
            userId: true
        }
    });

    return userId.userId;
}