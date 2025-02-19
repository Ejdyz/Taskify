import { NextResponse } from "next/server"
import { getAllUserTasks } from "@/lib/task/task";

export const POST = async (request) => {
    try {
        const tasks = await getAllUserTasks();

        if (tasks === null) {
            return NextResponse.json({
                success: false,
                message: "Internal server error"
            }, {
                status: 500
            });
        }

        return NextResponse.json({
            success: true,
            message: "Succesfully retrieved task data!",
            data: tasks
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