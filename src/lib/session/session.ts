import { cookies } from "next/headers";

export const getSession = async (): Promise<{ session: string | null }>  => {

    const cookieStore = await cookies();
    const cookieToken = cookieStore.get("authjs.session-token")?.value ?? null;

    return { session: cookieToken };
}