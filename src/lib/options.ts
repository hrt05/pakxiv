import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import prisma from "./prisma"
import bcrypt from "bcrypt"

const options: NextAuthOptions = {
    providers: [
        // credentialsというプロバイダー
        Credentials({

            // サインインフォームに表示される名前
            // 多分好きな名称でいいはず。。。。
            id: 'credentials',
            name: 'Credentials',

            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'password',
                    type: 'password',
                },
            },

            // authorizeという関数に先ほどのcredentialsを入れる
            async authorize(credentials) {

                // もしcredentialsのメールとパスワードがなかったら requiredですよを返す "required"は必須という意味
                if(!credentials?.email || !credentials.password) {
                    throw new Error('Email and password required')
                }

                // emailが存在しているかどうかチェック
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })

                // 存在していた場合
                if (!user || !user.hashedpassword) {
                    throw new Error('Email does not exists')
                }

                // bcryptで比較します
                const  isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedpassword
                )

                // もし比較して違ったら Incorrectは"正しくない"という意味
                if (!isCorrectPassword) {
                    throw new Error('Incorrect password')
                }

                return user
            },
        }),
    ],

    /** 多分ここからコールバック */

    pages: {
        signIn: '/auth'
    },

    // ここら辺のコメントは予想で書いてます
    // NODE_ENV を developmentにする
    debug: process.env.NODE_ENV === 'development',

    // 作ったprsima変数を入れる
    adapter: PrismaAdapter(prisma),

    // セッションタイプを指定
    session: {
        strategy: 'jwt',
    },

    // jwtの暗号鍵の指定
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },

    // 暗号かぎの指定 part2
    secret: process.env.NEXTAUTH_SECRET,
}
export default options