"use client"

import { Button } from "@charcoal-ui/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "./styles.module.css"

const TopPageComponent = () => {

    type Post = {
        id: string,
        title: string,
        description: string,
        images: [],
        user: {
            name: string
        }
    }

    type Image = {
        id: string,
        path: string,
        postId: string,
    }

    const [postArray, setPostArray] = useState<Post[]>([])

    useEffect(() => {
        const apiPosts = async () => {
            const fetchPosts = await fetch("/api/postsList", {method: "GET"})

            if (fetchPosts?.ok) {
                const posts = await fetchPosts.json()
                console.log(posts)
                setPostArray(posts)
            }
        }

        apiPosts();
    } ,[])

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

            <div className={styles.postDiv}>
                {postArray.map((item) => <div key={item.id} className={styles.post}>
                    {/* <p>{item.id}</p> */}
                    <p>{item.user.name}</p>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                    {item.images.map((image: Image, index) => <img key={index} className={styles.image} src={`https://pakxiv.s3.ap-northeast-1.amazonaws.com/${image.path}`} />)}
                </div>)}
            </div>

        </div>
    )
}

export default TopPageComponent