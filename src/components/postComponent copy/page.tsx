'use client'

import { Button } from "@charcoal-ui/react"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { useCallback, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import styles from "./styles.module.css"
import { Credentials } from "aws-sdk"
import { S3Client } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"

const PostPageComponent = () => {

    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null);

    const { data: session, status } = useSession()

    console.log(status)

    const handleSubmitTop = () => {
        router.push("/")
    }

    const handleSubmitTest = () => {
        console.log("テストボタンが押されました")
    }
    
    //middlewareで設定済み だったが動かなかったので戻します。 // 03/06 middlewareがnextAuthのアップデートで使えないとか？でコンポーネントで飛ぶようにしました。
    if (status === "unauthenticated")
        redirect("/")

    const [isLoading, setIsLoading] = useState(false)

    const accessKey = process.env.NEXT_PUBLIC_ACCESSKEY
    const secretAccessKey = process.env.NEXT_PUBLIC_SECRETACCESSKEY

    if (!accessKey || !secretAccessKey) {
        throw new Error("AWSの認証情報が設定されていません。")
    }

    const onDrop = useCallback(async (acceptedFiels: File[]) => {
        console.log("いったん確認", acceptedFiels)
        setIsLoading(true)
        const file = acceptedFiels[0];
        const creds = new Credentials(
            accessKey,
            secretAccessKey
        );

        try {
            const paralleUploads3 = new Upload({
                client: new S3Client({ region: "ap-northeast-1", credentials: creds, requestChecksumCalculation: "WHEN_REQUIRED" }),
                params: { Bucket: "バケットネーム", Key: file.name, Body: file, ContentType: file.type },
                // もし失敗したらs3側も消す設定 falseだと削除 trueだと壊れてても残します。
                leavePartsOnError: false,
            })

            //.onがイベントが動いたときとかの動作？ progressが進捗
            paralleUploads3.on("httpUploadProgress", (progress) => {
                console.log("progress確認", progress)
            })

            await paralleUploads3.done();
            await setIsLoading(false)

            console.log(paralleUploads3)
        } catch(e) {
            console.log(e)
        }

        console.log(file);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    const fileUpload = (e: React.MouseEvent) => {

        //親のdropzoneが動いてしまうのでボタンが発火されたら取り消し
        // e.stopPropagation()
        // e.preventDefault()

        if (inputRef.current == null) return;
        inputRef.current.click();
    }

    const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files == null) return;
        console.log(event.target.files[0])
    }

    return(
        <div>ポストページです
            <p>{session?.user.name}</p>
            <Button variant="Primary" onClick={handleSubmitTop}>トップへ</Button>
            <h2>testコード</h2>
            {isLoading ? <div><h2>アップロード中</h2></div>:
            
            <div>
                <div className={styles.dropArea} {...getRootProps()}>
                    <input {...getInputProps()}/>
                    <p>ここにドロップ又はクリック</p>
                    {/* <Button variant="Navigation" onClick={fileUpload}>または選択</Button> */}
                    <input type="file" className={styles.hiddenInput} accept=".png, .jpg, .jpeg, .webp" ref={inputRef} onChange={onFileInputChange}/>
                </div>
            </div>}
        </div>
    )
}

export default PostPageComponent

/** 参考サイト
 *  https://zenn.dev/jinwatanabe/articles/66c712e44661d9
 *  https://qiita.com/Takayuki_Nakano/items/f7997b5533d5e98b5b6c
 *  https://qiita.com/nya-mochi/items/d148fa5863627d972493
 */