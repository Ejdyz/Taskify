import { removeTask, isUserTaskAuthorByUserId } from "@/lib/task/task";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";


export const POST = async (request) => {
    try {

        const body = await request.json();

        if (!(body.taskId)) {
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

        const IsUserAuthor = await isUserTaskAuthorByUserId(session.user.id, body.taskId);
        if (!IsUserAuthor) {
            return NextResponse.json({
                success: false,
                message: "Insufficient permissions for this operation"
            }, {
                status: 401
            })
        }

        await removeTask(body.taskId);

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
}