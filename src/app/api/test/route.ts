import { NextResponse } from "next/server"

const testNaiyou = ['項目1', '項目2', '項目3']
const testNaiyou2 = ['項目4', '項目5', '項目6']

export const GET = () => {
    return NextResponse.json(testNaiyou)
}

export const POST = () => {
    return NextResponse.json(testNaiyou2)
}