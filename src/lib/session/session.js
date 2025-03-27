"use server"
import { cookies } from "next/headers";

export const getSession = async () => {
    
    const cookieStore = await cookies();
    let cookieToken = null;
    if (process.env.NODE_ENV === "production") {
        cookieToken = cookieStore.get("__Secure-authjs.session-token")?.value ?? null;
    }else{
        cookieToken = cookieStore.get("authjs.session-token")?.value ?? null;
    }

    return { session: cookieToken };
}

