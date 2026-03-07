import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    try {
        const { title, description, image } = await req.json()

        const imageKakunin = image

        return NextResponse.json(imageKakunin)
    } catch (e) {
        console.log(e)
    }
}