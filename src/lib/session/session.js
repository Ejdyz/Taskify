"use server"
import { cookies } from "next/headers";

export const getSession = async () => {
    
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get("authjs.session-token")?.value ?? null;

    return { session: cookieToken };

}

