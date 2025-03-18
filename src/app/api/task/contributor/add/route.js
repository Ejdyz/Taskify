import { isUserTaskAuthorByUserId } from "@/lib/task/task";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { addContributor } from "@/lib/contributor/contributor";

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

export const POST = async (request) => {
    try {
        const body = await request.json();

        console.log(request);
        
        if (!(body.taskId) || body.taskId === undefined || !(body.email) || body.email === undefined)  {
            return NextResponse.json({
                success: false,
                message: "Invalid request body!",
            }, {
                status: 400,
            });
        }

        if (!validateEmail(body.email)) {
            return NextResponse.json({
                success: false,
                message: "Invalid email format!",
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

         if (!(await isUserTaskAuthorByUserId(session.user.id, body.taskId))) {
            return NextResponse.json({
                success: false,
                message: "Insufficient permissions for this operation!"
            }, {
                status: 401
            });
        }
        
        if (await addContributor(body.taskId, body.email)){
            return NextResponse.json({
                success: true,
                message: "Successfully added a contributor!"
            }, {
                status: 200
            });
        }
        else {
            return NextResponse.json({
            
                success: false,
                message: "Something went wrong while adding a contributor!"
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