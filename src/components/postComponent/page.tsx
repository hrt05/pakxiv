'use client'

import { Button } from "@charcoal-ui/react"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"

const PostPageComponent = () => {

    const router = useRouter()

    const { data: session, status } = useSession()

    console.log(status)

    const handleSubmitTop = () => {
        router.push("/")
    }

    // middlewareで設定済み だったが動かなかったので戻します。
    // if (status === "unauthenticated")
    //     redirect("/")

    return(
        <div>ポストページです
            <p>{session?.user.name}</p>
            <Button variant="Primary" onClick={handleSubmitTop}>トップへ</Button>
        </div>
    )
}

export default PostPageComponent