import prisma from "../prisma/prisma";
import { getSession } from "../session/session";

export const getUserIdFromSessionToken = async () => {

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

export const getUsersWithSimilarEmail = async (email, limit) => {

    const emails = await prisma.user.findMany({
        where: {
            email: {
                contains: email
            }
        },
        select: {
            id: true,
            name: true,
            image: true,
            email: true,
        },
        take: limit
    });

    if (!(emails))
        return false;
    else
        return emails;
}