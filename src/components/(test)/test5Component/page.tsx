'use client'

import { Button, TextField } from "@charcoal-ui/react"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import React, { useCallback, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import styles from "./styles.module.css"
import { Credentials } from "aws-sdk"
import { S3Client } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"
import prisma from "@/lib/prisma"
// import React from "react"
// import { v4 as uuidv4 } from "uuid";

const TestPage5Component = () => {

    // const uniqueId = uuidv4()

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
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [uuidArray, setUuidArray] = useState([])

    const filesousin = async(formData: FormData) =>{
        const response = await fetch("/api/test2", {
            method: "POST",
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: formData
        })

        if (response?.ok) {
            const uuid = await response.json();
            setUuidArray(uuid)
            console.log(uuid)
            setIsLoading(false)
        } 
    }

    const toukou = async () => {
        const postFetch = await fetch("/api/post", {
            method: "POST",
            body: JSON.stringify({ title, description, uuidArray})
        })

        if (postFetch?.ok) {
            const nakami = await postFetch.json();
            console.log(nakami)
        }

    }

    // const accessKey = process.env.NEXT_PUBLIC_ACCESSKEY
    // const secretAccessKey = process.env.NEXT_PUBLIC_SECRETACCESSKEY

    // if (!accessKey || !secretAccessKey) {
    //     throw new Error("AWSの認証情報が設定されていません。")
    // }

    const onDrop = useCallback(async (acceptedFiels: File[]) => {
        const formData = new FormData();

        if (acceptedFiels != null) {
            for (let i = 0; i < acceptedFiels.length; i++)
                formData.append("files", acceptedFiels[i])
        }

        console.log("いったん確認", acceptedFiels)
        setIsLoading(true)
        // const file = acceptedFiels[0];
        filesousin(formData)
        // const creds = new Credentials(
        //     accessKey,
        //     secretAccessKey
        // );

        // try {
        //     const paralleUploads3 = new Upload({
        //         client: new S3Client({ region: "ap-northeast-1", credentials: creds, requestChecksumCalculation: "WHEN_REQUIRED" }),
        //         params: { Bucket: "pakxiv", Key: file.name, Body: file, ContentType: file.type },
        //         // もし失敗したらs3側も消す設定 falseだと削除 trueだと壊れてても残します。
        //         leavePartsOnError: false,
        //     })

        //     //.onがイベントが動いたときとかの動作？ progressが進捗
        //     paralleUploads3.on("httpUploadProgress", (progress) => {
        //         console.log("progress確認", progress)
        //     })

        //     await paralleUploads3.done();
        //     await setIsLoading(false)

        //     console.log(paralleUploads3)
        // } catch(e) {
        //     console.log(e)
        // }

        // console.log(file);
    }, []);

    const { fileRejections, getRootProps, getInputProps } = useDropzone({ onDrop, accept: {'image/jpeg': [], 'image/png': [], 'image/webp': []}, maxSize: 50 * 1024 * 1024 })

    // acceptのエラー処理
    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <React.Fragment key={file.name}>
            <div>
                {errors.map((e) => ((
                    <p key={e.code}>
                        {e.code == "file-too-large" ? `${file.name}のサイズが大きすぎます。` : `${file.name}はpng,jpeg,jpg,webpではございません。`}
                        {/* {file.name}
                        {e.code} */}
                    </p>
                )))}
            </div>
        </React.Fragment>
    ))

    const fileUpload = (e: React.MouseEvent) => {

        //親のdropzoneが動いてしまうのでボタンが発火されたら取り消し
        // e.stopPropagation()
        // e.preventDefault()

        if (inputRef.current == null) return;
        inputRef.current.click();
    }

    const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files == null) return;
        console.log("確認",event.target.files[0])
    }

    return(
        <>
            <div>ポストページです
                <p>{session?.user.name}</p>
                <Button variant="Primary" onClick={handleSubmitTop}>トップへ</Button>
                <h2>testコード</h2>
                {isLoading ? <div><h2>アップロード中</h2></div>:

                <div>
                    <div className={styles.dropArea} {...getRootProps()}>
                        {/* クリックしたときの処理 */}
                        <input {...getInputProps()} accept=".png, .jpg, .jpeg, .webp"/>
                        <p>ここにドロップ又はクリック</p>

                            {/* <Button variant="Navigation" onClick={fileUpload}>または選択</Button> */}
                            
                        {/* <input type="file" className={styles.hiddenInput} accept=".png, .jpg, .jpeg, .webp" ref={inputRef} onChange={onFileInputChange}/> */}
                    </div>
                </div>}
                <div>
                    <p>タイトル</p>
                    <TextField placeholder="タイトル" type="text" value={title} onChange={(value) => setTitle(value)}></TextField>
                </div>
                <div>
                    <p>説明</p>
                    <TextField placeholder="説明" type="text" value={description} onChange={(value) => setDescription(value)}></TextField>
                </div>
                <div>
                    <Button variant="Primary" onClick={toukou} >投稿</Button>
                </div>
                
                <div className={styles.atodekesu}>
                    <p>{title}</p>
                    <p>{description}</p>
                </div>

            </div>
            {fileRejectionItems}
        </>
    )
}

export default TestPage5Component

/** 参考サイト
 *  https://zenn.dev/jinwatanabe/articles/66c712e44661d9
 *  https://qiita.com/Takayuki_Nakano/items/f7997b5533d5e98b5b6c
 *  https://qiita.com/nya-mochi/items/d148fa5863627d972493
 */