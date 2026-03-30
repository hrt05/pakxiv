"use client"

import { useState } from "react";
import { v4 as uuidv4} from "uuid"

const TestPage4 = () => {

    const uniqueId = uuidv4()

    const [ testFile, setTestFile ] = useState("")
    const [ testFile2, setTestFile2 ] = useState("")

    const inputkakunin = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null) {
            const file = event.target.files[0]
            console.log("全文テスト",event.target.files)
            console.log("key[0]確認",file)

            const namaeHenkou = new File([file], uniqueId, {type: file.type})
            // setTestFile(window.URL.createObjectURL(file))};
            console.log(namaeHenkou)
            setTestFile2(window.URL.createObjectURL(namaeHenkou))};

    }

    // const inputkakunin = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files != null) {
    //         for (let i = 0; i < event.target.files?.length; i++)
    //         console.log(i)
    //     }
    // }

    return(
        <div>
            <h1>テストページです。</h1>
            {/* 複数枚選択: multiple ctrl推しながら複数枚選択するときのやつ*/}
            <input type="file" onChange={inputkakunin} multiple/>
            <p>{testFile2}</p>
            {testFile2?<img src={testFile2}></img>:<p>画像ないよ</p>}
        </div>
    )
}

export default TestPage4