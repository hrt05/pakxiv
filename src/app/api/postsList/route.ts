import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const result = await prisma.post.findMany(
            {
                include: { images: true }
            }
        )

        console.log(result)

        return NextResponse.json(result)
    } catch(e) {
        console.log(e)
    }
}