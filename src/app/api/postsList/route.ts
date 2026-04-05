import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        // const result = await prisma.post.findMany(
        //     {
        //         include: { images: true, user: true }
        //     }
        // )

        const result = await prisma.post.findMany(
            {
                include: { images: true, user: {select: {name: true}}}
            }
        )

        console.log(result)

        return NextResponse.json(result)
    } catch(e) {
        console.log(e)
    }
}