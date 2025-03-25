import { getUsersWithSimilarEmail } from "@/lib/user/user";
import { NextResponse } from "next/server";


export const GET = async (request) => {
    try {
        const params = { 
            email: await request.nextUrl.searchParams.get("email"), 
        };
        
        if (params.email === "" || params.email === null || params.email === undefined|| !(params.email) || typeof params.email !== "string")  {
            return NextResponse.json({
                success: false,
                message: "Invalid request body",
            }, {
                status: 400,
            });
        }

        const users = await getUsersWithSimilarEmail(params.email, 4);

        if (users === null || users === undefined || !(users) || users.length === 0)
            return NextResponse.json({
                success: true,
                message: "No users were found with that or similar email",
                body: []
            }, {
                status: 200,
            });
        else
            return NextResponse.json({
                success: true,
                message: "Successfully found similar accounts",
                body: users
            }, {
                status: 200,
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