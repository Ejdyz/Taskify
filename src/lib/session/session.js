import { cookies } from "next/headers";
import prisma from "../prisma/prisma";

export const getSession = async () => {
    
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get("authjs.session-token")?.value ?? null;

    return { session: cookieToken };

}

