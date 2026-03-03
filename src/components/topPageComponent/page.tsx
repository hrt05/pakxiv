"use client"

import { Button } from "@charcoal-ui/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const TopPageComponent = () => {

    const { data: session , status} = useSession()
    console.log("status", status)
    console.log("クライアントセッション",session)

    const user = session?.user

    const router = useRouter()

    const handleSubmitLogin = () => {
        console.log("押下テスト")
        router.push("/login")
    }
    const handleSubmitPost = () => {
        router.push("post")
    }

    console.log("user確認",user)

    return(
        <div>
            <p>テスト</p>
            <Button variant="Primary" onClick={handleSubmitLogin}>ログイン</Button>
            {user? 
            <div><h3>セッションテスト</h3><br /><p>{user.id}</p>
            </div> : null}
            <Button variant="Primary" onClick={handleSubmitPost}>投稿</Button>
        </div>
    )
}

export default TopPageComponent