import { NextResponse } from "next/server"

export const GET = async (request) => {
    return NextResponse.json({
        success: false,
        message: "test",
    }, {
        status: 500
    });
}