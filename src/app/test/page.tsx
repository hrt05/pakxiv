"use client"

import { useState } from "react"

const TestPage = () => {
    // const testChange = () => {
    //     console.log("フォルダが選択されました。")
    // }

    const [ testFile, setTestFile ] = useState("")

    return(
        <div>
            <h1>テストページです。</h1>
            <input type="file" value={testFile} onChange={(e) => setTestFile(e.target.value)}></input>

            {/* <img src={testFile}></img> */}
            <p>{testFile}</p>
        </div>
    )
}

export default TestPage