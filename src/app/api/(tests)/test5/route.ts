import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Credentials } from "aws-sdk"
import { S3Client } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"

export const POST = async (req: NextRequest) => {
    // 初回空配列生成
    const uuidArray = []

    /** APIキー設定等 */
    const accessKey = process.env.NEXT_PUBLIC_ACCESSKEY
    const secretAccessKey = process.env.NEXT_PUBLIC_SECRETACCESSKEY

    if (!accessKey || !secretAccessKey) {
        throw new Error("AWSの認証情報が設定されていません。")
    }

    const creds = new Credentials(
        accessKey,
        secretAccessKey
    );

    // apiのrequestからformDataを受け取り
    const formData = await req.formData()
    
    //.getAllはformDataのメソッドで、"files"のキーで中身を取得。
    //.filterは入ってきたオブジェクトをFileかどうか判断し、trueを返したときにarryはFile型だと約束するもの。(falseだったら約束できないよねって)
    // instanceofは左辺が右辺と型が合っているかどうか
    // const formArray = formData.getAll("files").filter((array): array is File => array instanceof File)
    const formArray = formData.getAll("files").filter((array) => array instanceof File)

    for (let fai = 0; fai < formArray.length; fai++) {
        const uniqueId = uuidv4();
        uuidArray.push({ path: uniqueId })
        
        const file = formArray[fai]

        try {
                const paralleUploads3 = new Upload({
                    client: new S3Client({ region: "ap-northeast-1", credentials: creds, requestChecksumCalculation: "WHEN_REQUIRED" }),
                    params: { Bucket: "pakxiv", Key: uniqueId, Body: file, ContentType: file.type },
                    // もし失敗したらs3側も消す設定 falseだと削除 trueだと壊れてても残します。
                    leavePartsOnError: false,
                })
        
                //.onがイベントが動いたときとかの動作？ progressが進捗
                paralleUploads3.on("httpUploadProgress", (progress) => {
                    console.log("progress確認", progress)
                })
        
                await paralleUploads3.done();
        
                console.log(paralleUploads3)
            } catch(e) {
                console.log(e)
            }
    }

    console.log("配列確認",uuidArray)
    return NextResponse.json(uuidArray)
}