import { createTask } from "@/lib/task/task";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {

        const body = await request.json();
        
        if (!(body.title) || body.title.trim() == "" || !(body.tasks)) {
            return NextResponse.json({
                success: false,
                message: error instanceof SyntaxError ? "JSON syntax error" : (error.details ? error.details[0].message : "An unknown error occurred")
            }, {
                status: 400,
            });
        }
        
        createTask(body.title, body.tasks);

        return NextResponse.json({
            success: true,
            message: "Successfully created a task!"
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