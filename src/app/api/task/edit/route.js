import { editTask, isUserAuthorOrContributorOfTaskByTaskId} from "@/lib/task/task";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";


export const POST = async (request) => {
    try {
        
        const body = await request.json();
        
        if (!(body.id)) {
            return NextResponse.json({
                success: false,
                message: "Invalid request body"
            }, {
                status: 400,
            });
        }

        const session = await auth();

        if (!session) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized: User not logged in"
            }, {
                status: 401
            });
        }


        const IsUserAuthor = await isUserAuthorOrContributorOfTaskByTaskId(session.user.id, body.id);
        if (!IsUserAuthor) {
            return NextResponse.json({
                success: false,
                message: "Insufficient permissions for this operation"
            }, {
                status: 401
            })
        }

        await editTask(body.id, body.title, body.tasks);

        return NextResponse.json({
            success: true,
            message: "Successfully edited a task!"
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
    
}



