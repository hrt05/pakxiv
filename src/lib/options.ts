import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import prisma from "./prisma"
import bcrypt from "bcrypt"

// サインアップや、ログインのときにnextAuthがsignIn()関数を用意しており、ログインがrest API側でokになった際に実行　→　そしたらこのAPIのauthorize()が呼ばれる。

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

    callbacks: {

        // jwt()は、ログイン直後とセッションが確認されるたびに呼ばれる関数（コールバックだから）
        async jwt({ token, user }){

            // userはログイン直後だけ存在する(authorize()が返したユーザー情報) 2026/02/20 0:46 時では59行目でuserをreturnしているから
            // 2回目以降は userがundifinedになる。

            // もしログイン直後のuserがtrueならば
            if (user) {
                // JWTトークンにid追加して保存する
                // user.idから取り出し、token.idに追加
                token.id = user.id
            }
            return token
        },

        // session()は、useSession()やgetServerSession()が呼ばれるたびに実行される関数

        // デフォルトだと、型がname, email, imagesしかないので、typesに記述します。
        async session({ session, token }){
            // もしsession.userがtrueならば
            if (session.user) {
                // tokenに保存してあったidをsessionに追加する。　上記でidが含まれているtokeをいれないといけない。
                // これをしないとフロント側でsession.user.idが撮れない
                session.user.id = token.id
            }

            // sessionを返すことでuseSession()の呼び出し元に渡される。 (useSession()を実行したらidの含まれているsessionが返されるような形。)
            return session


            // {
            //     /** この部分はAIが提案 */
            //     // ...session,
            //     // user: {
            //     //     ...session.user,
            //     //     id: token.id
            //     // }
            // }
        }
    },

    pages: {
        signIn: '/'
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

// 参考にさせていただいた。
// https://qiita.com/curry__30/items/0ce5b75cd51fe55dfadd