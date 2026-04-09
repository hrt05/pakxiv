import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    console.log("reqかくにんんんんんｎ", req)
    
    const { searchParams } = new URL(req.url)
    const serverUserId = searchParams.get("userId")

    if (!serverUserId) {
        console.log("userId無いよ！！")
    }

    console.log("serveruserIDだよにょにょにょ", serverUserId)

    const userPost = await prisma.post.findMany({
            where: { userId: `${serverUserId}`}
        })
    
        console.log("userPost確認なんだよおおおおおおお", userPost)
        return NextResponse.json(userPost)
}