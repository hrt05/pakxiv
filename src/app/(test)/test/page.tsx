"use client"

// import { useRef } from "react"

import { useState } from "react"

const TestPage = () => {

    // const inputRef = useRef<HTMLInputElement>(null)
    // const testChange = () => {
    //     console.log("フォルダが選択されました。")
    // }

    const [ testFile, setTestFile ] = useState("")

    const inputkakunin = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null) {
            const file = event.target.files[0]
        // if (inputRef.current == null) return;
        // console.log(inputRef.current.click())
            console.log("全文テスト",event.target.files)
            console.log("合っているか1",event.target.files[0])
            console.log("合っているか2",file)
            
            setTestFile(window.URL.createObjectURL(file))}
    }

    // function inputkakunin() {}

    return(
        <div>
            <h1>テストページです。</h1>
            <input type="file" onChange={inputkakunin}></input>

            {/* <img src={testFile}></img> */}
            <p>{testFile}</p>
            {testFile?<img src={testFile}></img>:<p>画像ないよ</p>}
        </div>
    )
}

export default TestPage