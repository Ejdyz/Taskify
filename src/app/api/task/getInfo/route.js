import { NextResponse } from "next/server"

export const POST = async (request) => {
    try {
        const body = await request.json();

        if (!body.id)
        {
            return NextResponse.json({
                success: false,
                message: error instanceof SyntaxError ? "JSON syntax error" : (error.details ? error.details[0].message : "An unknown error occurred")
            }, {
                status: 400
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