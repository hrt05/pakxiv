import { Session } from "next-auth"
import styles from "./styles.module.css"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"
import MyPageImageComponent from "../myPageImageComponent/page"
import EditProfileComponent from "../editProfileComponent/page"

type ServerSessionProps = {
    serverSession: Session | null
}

type Image = {
    id: string,
    path: string,
    postId: string,
}

const MyPageComponent = async ({ serverSession }: ServerSessionProps) => {
    console.log("サーバー側からのプロップス", serverSession)
    const user = await serverSession?.user

    // const headersData = headers();
    // const protocol = (await headersData).get('x-forwarded-proto') || 'http';
    // const host = (await headersData).get('host');
    // const apiBase = `${protocol}://${host}`

    // const userPostFetch = async () => {
    //     const userPost = await fetch(`${apiBase}/api/userPost?userId=${user?.id}`, {
    //         method: "GET",
    //     })

    //     const data = await userPost.json()
    //     console.log("配列確認だよ！！！！！！！",data)

    //     if (userPost?.ok) {
    //         console.log("ちゃんと行けたよ")
    //         console.log(userPost.json)
            
    //     }

    //     return userPost.json
    // }
    // await userPostFetch()

    const userPost = await prisma.post.findMany({
        where: {userId: `${user?.id}`},
        include: {
            images: true, user: {select: {name: true}}
        }
    })

    console.log("これどうですか？",userPost)

    return(
        <div>
            <h1>これはマイページです。</h1>
            <div>
                <p>{user?.email}</p>
                <p>{user?.id}</p>
                {user?.image !== '' ? <img className={styles.icon} src={`https://pakxiv.s3.ap-northeast-1.amazonaws.com/${user?.image}`}/> : <img className={styles.icon} src="https://pakxiv.s3.ap-northeast-1.amazonaws.com/nullIcon/%E3%81%A8%E3%81%91%E3%81%A1%E3%82%83%E3%81%86%E7%8C%AB%E3%81%95%E3%82%93.jpg"/>}
                {/* <MyPageImageComponent imageProps={user?.image}/> */}
                <p>{user?.name ?? 'omae dare'}</p>
            </div>
            <div>
                <EditProfileComponent userProps={user}/>
                {/* <EditProfileComponent imageProps={user?.image}/> */}
            </div>
            <div>
                <h2>自分の投稿</h2>
                <div className={styles.postDiv}>
                {userPost.map((item) => <div key={item.id} className={styles.post}>
                    {/* <p>{item.id}</p> */}
                    <p>{item.user.name}</p>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                    <div>{item.images.map((image: Image, index) => <img key={index} className={styles.image} src={`https://pakxiv.s3.ap-northeast-1.amazonaws.com/${image.path}`} />)}</div>
                </div>)}
                </div>
            </div>
        </div>
    )
}

export default MyPageComponent