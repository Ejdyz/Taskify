import { favoriteTask, isUserAuthorOrContributorOfTaskByTaskId } from "@/lib/task/task";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";


export const POST = async (request) => {
    try {

        const body = await request.json();

        if (!(body.taskId) || body.isFavorite === undefined || body.isFavorite === null || typeof body.isFavorite !== "boolean" || typeof body.taskId !== "string")  {
            return NextResponse.json({
                success: false,
                message: "Invalid request body",
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

        if (!(await isUserSubTaskAuthorByUserId(session.user.id, body.goalId))) {
            return NextResponse.json({
                success: false,
                message: "Insufficient permissions for this operation!"
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
        
        if (await favoriteTask(body.taskId, session.user.id, body.isFavorite)){
            return NextResponse.json({
                success: true,
                message: "Successfully added the task to favorites!"
            }, {
                status: 200
            });
        }
        else {
            return NextResponse.json({
            
                success: false,
                message: "Something went wrong while favoriting a task!"
            }, {
                status: 500
            });
        }


    } catch (error) {
        console.error(error);
        return NextResponse.json({
            
            success: false,
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}