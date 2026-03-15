"use client"

import { Button } from "@charcoal-ui/react";
import { Data } from "aws-sdk/clients/firehose";
import { useState } from "react";

const TestPage2 = () => {

    // const imageFiles: File[]= []

    

    const filesousin = async(formData: FormData) =>{
        const response = await fetch("/api/test2", {
            method: "POST",
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: formData
        })

        if (response?.ok) {
            const data = await response.json();
            console.log(data)
        } 
    }

    // const [ testFile, setTestFile ] = useState("")

    // const inputkakunin = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files != null) {
    //         const file = event.target.files[0]
    //         console.log("全文テスト",event.target.files)
    //         console.log("key[0]確認",file)

    //         setTestFile(window.URL.createObjectURL(file))}
    // }

    const inputkakunin = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();

        if (event.target.files != null) {
            for (let i = 0; i < event.target.files?.length; i++) {
                console.log(event.target.files[i])
                // imageFiles.push(event.target.files[i])
                formData.append("files", event.target.files[i])
            }
        }
        console.log(formData)
        filesousin(formData)
    }

    return(
        <div>
            <h1>テストページです。</h1>
            {/* 複数枚選択: multiple ctrl推しながら複数枚選択するときのやつ*/}
            <input type="file" onChange={inputkakunin} multiple/>
            {/* <Button variant="Navigation" onClick={filesousin}>テストボタン</Button> */}
            {/* <p>{testFile}</p>
            {testFile?<img src={testFile}></img>:<p>画像ないよ</p>} */}
        </div>
    )
}

export default TestPage2