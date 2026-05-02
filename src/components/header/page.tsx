import options from "@/lib/options"
import { getServerSession } from "next-auth"
import styles from "./styles.module.css"
import Link from "next/link"
import { userDataHooks } from "@/utils/user"

const Header = async () => {
    const session = await getServerSession(options)
    console.log("サーバー側セッション", session)

    // if (!session) {
    //     return
    // }

    const user = session?.user.id != null ? await userDataHooks(session.user.id) : null;

    // if (!user) {
    //     return
    // }

    // const router = useRouter()

    return (
        <div className={styles.background}>
            <p>ロゴ - header -</p>
            {session && user ?
                <Link href={"/myPage"}>
                    {user.image !== '' ? <img className={styles.icon} alt="アイコンが設定されているときの画像" src={`https://pakxiv.s3.ap-northeast-1.amazonaws.com/profile/${user.image}`} /> : <img className={styles.icon} src="https://pakxiv.s3.ap-northeast-1.amazonaws.com/nullIcon/%E3%81%A8%E3%81%91%E3%81%A1%E3%82%83%E3%81%86%E7%8C%AB%E3%81%95%E3%82%93.jpg" />}
                </Link>
                : <p>未ログイン</p>}
            {/* <img className={styles.icon} src={`https://pakxiv.s3.ap-northeast-1.amazonaws.com/${session?.user.image}`}/> */}
        </div>
    )
}

export default Header