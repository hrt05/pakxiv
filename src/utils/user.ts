import prisma from "@/lib/prisma"

export const userDataHooks = async (userId: string) => {
    const userDataHooksDef = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            description: true,
            image: true
        }
    })

    return userDataHooksDef
}