import { removeTask } from "@/lib/task/task";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const loggedUser = await getUserIdFromSessionToken();
        if (!loggedUser) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized: User not logged in"
            }, {
                status: 401
            });
        }   
        const body = await request.json();
        
        if (!(body.taskId)) {
            return NextResponse.json({
                success: false,
                message: error instanceof SyntaxError ? "JSON syntax error" : (error.details ? error.details[0].message : "An unknown error occurred")
            }, {
                status: 400,
            });
        }
        
        removeTask(body.taskId);

        return NextResponse.json({
            success: true,
            message: "Successfully deleted a task!"
        }, {
            status: 200
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, {
            status: 500
        });
    }
        
    return NextResponse.json({
        success: false,
        message: "Internal server error"
    }, {
        status: 500
    });
}