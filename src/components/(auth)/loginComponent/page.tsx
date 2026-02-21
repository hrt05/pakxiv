'use client'

import { Button } from "@charcoal-ui/react"
import { useRouter } from "next/navigation"

const LoginPageComponent = () => {

    const router = useRouter()

    const handleSubmitRegister = () => {
        router.push("/register")
    }

    return(
        <div>
            ログイン
            <Button variant="Default" onClick={handleSubmitRegister}>新規登録</Button>
        </div>
    )
}

export default LoginPageComponent