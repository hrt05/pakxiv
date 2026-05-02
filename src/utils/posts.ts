import prisma from "@/lib/prisma"

export const userPostDef = async (userId: string) => {
    const userPost = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc"
        },
        where: {userId: userId},
        include: {
            images: true, user: {select: {name: true}}
        }
    })

    return userPost
}