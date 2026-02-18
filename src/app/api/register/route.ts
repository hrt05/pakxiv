import { NextResponse } from "next/server";

export const POST = async (req: Request, res : NextResponse) => {
    try{
        if (req.method !== 'POST')
            return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

        
    } catch(e) {

    }
}