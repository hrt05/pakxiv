import { Session } from "next-auth"

type ServerSessionProps = {
    serverSession: Session | null
}

const MyPageComponent = (serverSession: ServerSessionProps) => {
    console.log(serverSession)

    return(
        <div>
            <p>これはマイページです。</p>
        </div>
    )
}

export default MyPageComponent