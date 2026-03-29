import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    try {
        const { title, description, uuidArray } = await req.json()

        console.log("title確認", title)
        console.log("description確認", description)
        console.log("uuid確認", uuidArray)
        // const imageKakunin = image

        // return NextResponse.json(imageKakunin)

        await prisma.post.create({
            data: {
                title: title,
                description: description,
                images: {
                    create: uuidArray
                }
            }
        })

        return NextResponse.json("post成功")
    } catch (e) {
        console.log(e)
    }
}