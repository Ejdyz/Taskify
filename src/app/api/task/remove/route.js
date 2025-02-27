import { removeTask } from "@/lib/task/task";
import { NextResponse } from "next/server";
import { getUserIdFromSessionToken } from "@/lib/user/user";
import { auth } from "@/lib/auth/auth";


export const POST = async (request) => {
    try {
    
        const body = await request.json();
        const session = await auth();

        if (!(body.taskId) || !(body.authorId))  {
            return NextResponse.json({
                success: false,
                message: error instanceof SyntaxError ? "JSON syntax error" : (error.details ? error.details[0].message : "An unknown error occurred")
            }, {
                status: 400,
            });
        }

        if (!session || !session.user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized: User not logged in"
            }, {
                status: 401
            });
        }

        if (session.user.id !== body.authorId) {
            return NextResponse.json({
                success: false,
                message: "Forbidden: You are not the author of this task"
            }, {
                status: 403
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
        console.error(error);
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