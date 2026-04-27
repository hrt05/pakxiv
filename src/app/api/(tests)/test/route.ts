import { NextRequest, NextResponse } from "next/server";

// const testNaiyou = ['項目1', '項目2', '項目3']
const testNaiyou2 = ['項目4', '項目5', '項目6']



// export const GET = () => {
//     return NextResponse.json(testNaiyou)
// }

// const res = NextResponse
// // urlのパラメーターを引数で受け取る
// export const GET = async(req: NextRequest) => {
//     const { searchParams } = req.nextUrl
//     const reqRaram = searchParams.get("req")

//     return await res.json({ req: reqRaram})
// }

export const POST = () => {
    return NextResponse.json(testNaiyou2)
}