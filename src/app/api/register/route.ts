import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export const POST = async (req: Request, res : NextResponse) => {
    try{

        // 2026/02/21 next側のPOST以外の時は405を返すという設定になっているから以下のはいらなかった。 export const defaultなどだったら必要
        // もしメソッドがPOSTじゃなかったら405を返します
        // if (req.method !== 'POST')
        //     return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

        // reqの中身を取り出します。
        const { email, password, name } = await req.json()

        // 受け取ったemailがuserテーブルに含まれていたらexistingUserに入れます。
        const existingUser = await prisma.user.findUnique({ where: {email} })

        // 登録済みなら422返します。
        if (existingUser)
            return NextResponse.json({ message: 'Email taken' }, { status: 422 })

        // bcryptを使ってpasswordを12文字のハッシュパスワードにします。
        const hashedpassword = await bcrypt.hash(password, 12)

        /** いったんimagesは空にしておきます。 */
        const user = await prisma.user.create({
            data: {
                email,
                hashedpassword,
                name,
                image: '',
                emailVerified: new Date(),
            }
        })
        
        // 作成がうまくいったら201を返します。
        return NextResponse.json({ user }, { status: 201 })

    } catch(e: any) {
        // 予期せぬエラーが起きた場合に500を返します。
        return NextResponse.json({ message: e.message }, { status: 500 })
    }
}