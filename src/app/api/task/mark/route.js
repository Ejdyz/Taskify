import { isUserSubTaskAuthorByUserId, markSubTask } from "@/lib/task/task";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";


export const POST = async (request) => {
    try {

        const body = await request.json();

        if (!(body.goalId) || body.isMarked === undefined)  {
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
        
        if (await markSubTask(body.goalId, body.isMarked)){
            return NextResponse.json({
                success: true,
                message: "Successfully marked a goal!"
            }, {
                status: 200
            });
        }
        else {
            return NextResponse.json({
            
                success: false,
                message: "Internal server error"
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