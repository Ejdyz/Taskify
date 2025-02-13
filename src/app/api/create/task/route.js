import { NextResponse } from "next/server"

export const GET = async (request) => {
    return NextResponse.json({ message: "hell yes" });
}