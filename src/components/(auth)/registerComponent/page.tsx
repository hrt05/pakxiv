'use client'

import { Button, TextField } from "@charcoal-ui/react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const RegisterPageComponent = () => {

    const router = useRouter()

    const handleSubmitRegister = async () => {
        console.log(step)
        if (step === true) {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: mailAddress, password: password, name: name})
            })

            if (response.ok) {
                // signIn関数は非同期じゃないとダメらしいのでasyncにし、引数がないと何のproviderでやるかが判定できないので引数を渡します。
                // authorize関数に、emailとpasswordしか設定していないので、引数はこの二つ(/lib/options.ts)
                const result = await signIn("credentials", {
                    email: mailAddress, password: password, redirect: false,
                })
                if (result?.ok) {
                    router.push("/")
                } else {
                    // ??はNull合体演算子
                    console.log(result?.error ?? "ログインに失敗しました")
                }
            } else {
                alert('エラー')
            }
        } else {
            setStep(true)
        }
    }
    const handleSubmitLogin = () => {
        router.push("/login")
    }

    const [mailAddress, setMailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const [step, setStep] = useState(false)

    return(
        <div>レジスター
            {step === false ? <div>
                <TextField placeholder="メールアドレス" type="text" value={mailAddress} onChange={(value) => setMailAddress(value)}/>
                <TextField placeholder="パスワード" type="password" value={password} onChange={(value) => setPassword(value)}/>

                <p>{mailAddress}</p>
                <p>{password}</p>

                <Button variant="Primary" onClick={handleSubmitRegister}>次へ</Button>
                <Button variant="Default" onClick={handleSubmitLogin}>ログイン</Button>
            </div> : <div>
                <TextField placeholder="名前" type="text" value={name} onChange={(value) => setName(value)}/>
                <p>{name}</p>
                <Button variant="Primary" onClick={handleSubmitRegister}>登録</Button>
            </div>}
        </div>
    )
}

export default RegisterPageComponent