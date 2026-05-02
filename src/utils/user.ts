import prisma from "@/lib/prisma"

export const userDataDef = async (userId: string) => {
    const userData = await prisma.user.findUnique({
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

    return userData
}