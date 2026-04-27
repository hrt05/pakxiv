import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            description: string
        } & DefaultSession["user"]
    }
    interface User {
        description: string
    }

    interface
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        description: string
    }
}

// declare module "next-auth/adapters" {
//     interface AdapterUser {
//         description?: string | null
//     }
// }