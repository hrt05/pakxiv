import options from "@/lib/options"
import { getServerSession } from "next-auth"


const Header = async () => {
    const sessiion = await getServerSession(options)
    console.log ("サーバー側セッション", sessiion)
    return(
        <div>
            <p>ロゴ</p>
        </div>
    )
}

export default Header