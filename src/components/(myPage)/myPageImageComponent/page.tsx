'use client'

import styles from "./styles.module.css"

type Props = {
    imageProps?: string | null;
}

const MyPageImageComponent = ({imageProps}: Props) => {
    const image = imageProps

    const testHundleClick = () => {
        console.log("クライアントになったかテスト")
    }

    return(
        <div onClick={testHundleClick}>
            {image !== '' ? <img className={styles.icon} src={`https://pakxiv.s3.ap-northeast-1.amazonaws.com/${image}`}/> : <img className={styles.icon} src="https://pakxiv.s3.ap-northeast-1.amazonaws.com/nullIcon/%E3%81%A8%E3%81%91%E3%81%A1%E3%82%83%E3%81%86%E7%8C%AB%E3%81%95%E3%82%93.jpg"/>}
        </div>
    )
}

export default MyPageImageComponent