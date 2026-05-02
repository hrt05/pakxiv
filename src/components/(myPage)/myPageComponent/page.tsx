import { Session } from "next-auth"
import styles from "./styles.module.css"
import prisma from "@/lib/prisma"
import EditProfileComponent from "../editProfileComponent/page"
import { redirect } from "next/navigation"
import { userDataDef } from "@/utils/user"
import { userPostDef } from "@/utils/posts"

type ServerSessionProps = {
    serverSession: Session | null
}

type Image = {
    id: string,
    path: string,
    postId: string,
}

const MyPageComponent = async ({ serverSession }: ServerSessionProps) => {

    if (!serverSession) {
        redirect("/")
    }

    console.log("サーバー側からのプロップス", serverSession)
    const ServerSessionUser = await serverSession.user
    const ServerSessionUserId = ServerSessionUser.id

    // const userData = await prisma.user.findUnique({
    //     where: {
    //         id: ServerSessionUserId
    //     },
    //     select: {
    //         id: true,
    //         name: true,
    //         description: true,
    //         image: true
    //     }
    // })

    const userData = await userDataDef(ServerSessionUserId)

    console.log("ユーザーDB", userData)

    // const userPost = await prisma.post.findMany({
    //     orderBy: {
    //         createdAt: "desc"
    //     },
    //     where: {userId: ServerSessionUserId},
    //     include: {
    //         images: true, user: {select: {name: true}}
    //     }
    // })

    const userPost = await userPostDef(ServerSessionUserId)

    console.log("これどうですか？",userPost)

    return(
        <div>
            <h1>これはマイページです。</h1>
            <div>
                <p>{userData?.id}</p>
                {userData?.image !== '' ? <img className={styles.icon} src={`https://pakxiv.s3.ap-northeast-1.amazonaws.com/profile/${userData?.image}`}/> : <img className={styles.icon} src="https://pakxiv.s3.ap-northeast-1.amazonaws.com/nullIcon/%E3%81%A8%E3%81%91%E3%81%A1%E3%82%83%E3%81%86%E7%8C%AB%E3%81%95%E3%82%93.jpg"/>}
                <p>{userData?.name ?? 'omae dare'}</p>
            </div>
            <div>
                {userData ? <EditProfileComponent {...userData}/> : null}
            </div>
            <div>
                <h2>自分の投稿</h2>
                <div className={styles.postDiv}>
                {userPost.map((item) => <div key={item.id} className={styles.post}>
                    <p>{item.user.name}</p>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                    <div>{item.images.map((image: Image, index) => <img key={index} className={styles.image} src={`https://pakxiv.s3.ap-northeast-1.amazonaws.com/post/${image.path}`} />)}</div>
                </div>)}
                </div>
            </div>
        </div>
    )
}

export default MyPageComponent