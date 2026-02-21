"use client"

import { Button } from "@charcoal-ui/react"
import { useRouter } from "next/navigation"

const TopPageComponent = () => {

    const router = useRouter()

    const handleSubmitLogin = () => {
        console.log("押下テスト")
        router.push("/login")
    }

    return(
        <div>
            <p>テスト</p>
            <Button variant="Primary" onClick={handleSubmitLogin}>ログイン</Button>
        </div>
    )
}

export default TopPageComponent