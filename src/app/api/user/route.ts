import options from "@/lib/options"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"

export const GET = async () => {
    const session = await getServerSession(options)
    const serverSessionUserId = session?.user.id

    const user = await prisma.user.findUnique({
        where: {
            id: serverSessionUserId
        }
    })

    console.log("dbからのユーザー情報だよ",user)
}