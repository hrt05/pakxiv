'use client'

import { Button, TextField } from "@charcoal-ui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginPageComponent = () => {

    const router = useRouter()

    /** ボタン処理 */

    const handleSubmitRegister = () => {
        router.push("/register")
    }
    const handleSubmitLogin = () => {
        
    }

    /** テキストフィールドの処理 */
    const [mailAddress, setMailAddress] = useState("")
    const [password, setPassword] = useState("")

    return(
        <div>
            ログイン
            <TextField placeholder="メールアドレス" type="text" value={mailAddress} onChange={(value) => setMailAddress(value)}/>
            <TextField placeholder="パスワード" type="password" value={password} onChange={(value) => setPassword(value)}/>

            <p>{mailAddress}</p>
            <p>{password}</p>

            <Button variant="Primary" onClick={handleSubmitRegister}>新規登録</Button>
            <Button variant="Default" onClick={handleSubmitLogin}>ログイン</Button>
        </div>
    )
}

export default LoginPageComponent