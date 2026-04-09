import Header from "@/components/header/page"
import MyPageComponent from "@/components/myPageComponent/page"
import options from "@/lib/options"
import { getServerSession } from "next-auth"

const MyPage = async () => {

    const session = await getServerSession(options)

    return (
        <div>
            <Header />
            <MyPageComponent serverSession = {session}/>
        </div>
    )
}

export default MyPage