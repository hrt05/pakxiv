import withAuth from "next-auth/middleware";

export default withAuth({
    //ログインしてなかったら以下のpathに遷移
    pages: {
        signIn: '/login',
    }
})

export const config = {
    // 保護したいページ
    matcher: ['/post/:path*'],
    // matcher: ['/dashboard'],
}