import options from "@/lib/options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export const PATCH = async (req: NextRequest) => {
    const session = await getServerSession(options);
    const user = session?.user

    // const { name, description, image, clientUserId } = await req.json()
    const { userName, userDescription, userImage } = await req.json()

    console.log("あれちゃんと動いとる？？？？", userDescription)

    // if (user?.id !== clientUserId) {
    //     // return NextResponse.json("アカウント情報が一致しませんでした。")
    //     return NextResponse.json({ message: "アカウント情報が一致しませんでした" }, { status: 403 })
    // }

    if (!user?.id) {
        return NextResponse.json({ message: "アカウント情報ありません" }, { status: 401 })
    }

    await prisma.user.update({
        data: {
            name: userName,
            description: userDescription,
            image: userImage
        },
        where: {
            id: user?.id
        }
    })
    
    console.log(user)

    return NextResponse.json({ message: "更新完了" }, { status: 200 })
}