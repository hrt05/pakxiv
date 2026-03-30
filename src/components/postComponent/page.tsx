'use client'

import { Button, TextField } from "@charcoal-ui/react"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import React, { useCallback, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import styles from "./styles.module.css"

const TestPage5Component = () => {

    const router = useRouter()

    const { data: session, status } = useSession()

    console.log(status)

    const handleSubmitTop = () => {
        router.push("/")
    }

    if (status === "unauthenticated")
        redirect("/")

    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [uuidArray, setUuidArray] = useState([])

    const filesousin = async(formData: FormData) =>{
        const response = await fetch("/api/tests/test2", {
            method: "POST",
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
            console.log("中身確認２",nakami)
            await router.push("/")
        }

    }

    const onDrop = useCallback(async (acceptedFiels: File[]) => {
        const formData = new FormData();

        if (acceptedFiels != null) {
            for (let i = 0; i < acceptedFiels.length; i++)
                formData.append("files", acceptedFiels[i])
        }

        console.log("いったん確認", acceptedFiels)
        setIsLoading(true)
        filesousin(formData)
    }, []);

    const { fileRejections, getRootProps, getInputProps } = useDropzone({ onDrop, accept: {'image/jpeg': [], 'image/png': [], 'image/webp': []}, maxSize: 50 * 1024 * 1024, maxFiles: 4})

    // acceptのエラー処理
    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <React.Fragment key={file.name}>
            <div>
                {errors.map((e) => ((
                    <p key={e.code}>
                        <p>{e.code}</p>
                        {e.code == "file-too-large" ? `${file.name}のサイズが大きすぎます。` : e.code == "file-invalid-type" ? `${file.name}はpng,jpeg,jpg,webpではございません。` : e.code == "too-many-files" ? `枚数が多いです。` : `不明なエラー`}
                    </p>
                )))}
            </div>
        </React.Fragment>
    ))

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