import MyPageComponent from "@/components/myPageComponent/page"
import options from "@/lib/options"
import { getServerSession } from "next-auth"

const MyPage = async () => {

    const session = await getServerSession(options)

    return <MyPageComponent serverSession = {session}/>
}

export default MyPage