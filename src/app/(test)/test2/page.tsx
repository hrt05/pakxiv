"use client"

import { useState } from "react";

const TestPage2 = () => {

    // const [ testFile, setTestFile ] = useState("")

    // const inputkakunin = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files != null) {
    //         const file = event.target.files[0]
    //         console.log("全文テスト",event.target.files)
    //         console.log("key[0]確認",file)

    //         setTestFile(window.URL.createObjectURL(file))}
    // }

    const inputkakunin = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null) {
            for (let i = 0; i < event.target.files?.length; i++)
            console.log(i)
        }
    }

    return(
        <div>
            <h1>テストページです。</h1>
            {/* 複数枚選択: multiple ctrl推しながら複数枚選択するときのやつ*/}
            <input type="file" onChange={inputkakunin} multiple/>
            {/* <p>{testFile}</p>
            {testFile?<img src={testFile}></img>:<p>画像ないよ</p>} */}
        </div>
    )
}

export default TestPage2