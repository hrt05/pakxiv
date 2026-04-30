'use client'

import { Button, TextArea, TextField } from "@charcoal-ui/react"
import { useRef, useState } from "react"
import styles from "./styles.module.css"

type Props = {
    id: string;
    name: string | null;
    description: string;
    image: string | null;
}

// const EditProfileComponent = ({imageProps}: Props) => {
const EditProfileComponent = (userProps: Props) => {

    const user = userProps

    // const { update } = useSession()
    // const clientUserId = session?.user.id

    console.log(user)

    const name = user?.name
    const description = user?.description
    const image = user?.image

    const [modal, setModal] = useState(false)

    /**
     * ユーザーのuseStateなど
     */
    const [userName, setUserName] = useState(`${name}`)
    const [userDescription, setUserDescription] = useState(`${description}`)
    const [userImage, setUserImage] = useState(`${image}`)

    // refの使い方わからなくてaiに聞きました。
    const inputRef = useRef<HTMLInputElement>(null)
    const handleClickRef = () => {
        inputRef.current?.click();
        console.log("アイコン変更したい。。。！！１")
    }

    const hundleModalClick = () => {
        setModal(true)
    }

    const hundleUpdateClick = async () => {
        console.log("あれえええええ？？？？＊",{ userName, userDescription, userImage })
        const apiFetch = await fetch("/api/profileEdit", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userName, userDescription, userImage })
        })

        if (apiFetch.ok) {
            window.location.reload();
        }
    }

    return (
        <>
            <Button variant="Default" onClick={hundleModalClick}>profileの編集</Button>
            {modal ? 
            <div role="dialog" aria-modal="true" className={styles.modal} onClick={() => setModal(false)}>
                <div className={styles.modalIn} onClick={(e) => e.stopPropagation()}>
                    {image !== '' ? <div className={styles.iconDiv}><img className={styles.icon} src={`https://pakxiv.s3.ap-northeast-1.amazonaws.com/${image}`}/></div> : <div className={styles.iconDiv}><img onClick={handleClickRef} className={styles.icon} src="https://pakxiv.s3.ap-northeast-1.amazonaws.com/nullIcon/%E3%81%A8%E3%81%91%E3%81%A1%E3%82%83%E3%81%86%E7%8C%AB%E3%81%95%E3%82%93.jpg"/></div>}
                        <input hidden type="file" ref={inputRef}/>
                    <div className={styles.name}>
                        <p className={styles.ptagName}>名前</p>
                        <TextField className={styles.nameField} type="text" value={userName} onChange={(value) => setUserName(value)} />
                    </div>

                    <div className={styles.descDiv}>
                        <TextArea value={userDescription} onChange={(value) => setUserDescription(value)}></TextArea>
                    </div>

                    <div className={styles.buttons}>
                        <div>
                            <Button variant="Danger" className={styles.button} onClick={hundleUpdateClick}>更新</Button>
                        </div>
                        <div>
                            <Button className={styles.button}>閉じる</Button>
                        </div>
                    </div>

                </div>
            </div> : 
            <p>falseだよ</p>
            }
        </>
    )
}

export default EditProfileComponent