'use client'

import { Button } from "@charcoal-ui/react"
import { useRef, useState } from "react"
import styles from "./styles.module.css"

type Props = {
    imageProps: string | null | undefined
}

const EditProfileComponent = ({imageProps}: Props) => {
    const image = imageProps

    const [modal, setModal] = useState(false)

    // refの使い方わからなくてaiに聞きました。
    const inputRef = useRef<HTMLInputElement>(null)
    const handleClickRef = () => {
        inputRef.current?.click();
        console.log("アイコン変更したい。。。！！１")
    }

    const hundleModalClick = () => {
        setModal(true)
    }

    return (
        <>
            <Button variant="Default" onClick={hundleModalClick}>profileの編集</Button>
            {modal ? 
            <div role="dialog" aria-modal="true" className={styles.modal} onClick={() => setModal(false)}>
                <div className={styles.modalIn} onClick={(e) => e.stopPropagation()}>
                {image !== '' ? <div className={styles.iconDiv}><img className={styles.icon} src={`https://pakxiv.s3.ap-northeast-1.amazonaws.com/${image}`}/></div> : <div className={styles.iconDiv}><img onClick={handleClickRef} className={styles.icon} src="https://pakxiv.s3.ap-northeast-1.amazonaws.com/nullIcon/%E3%81%A8%E3%81%91%E3%81%A1%E3%82%83%E3%81%86%E7%8C%AB%E3%81%95%E3%82%93.jpg"/></div>}
                    <input hidden type="file" ref={inputRef}/>
                </div>
                <div>
                    
                </div>
            </div> : 
            <p>falseだよ</p>
            }
        </>
    )
}

export default EditProfileComponent