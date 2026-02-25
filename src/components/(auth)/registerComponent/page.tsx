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
                signIn()
                router.push("/")
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