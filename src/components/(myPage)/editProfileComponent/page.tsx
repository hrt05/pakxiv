'use client'

import { Button } from "@charcoal-ui/react"
import { useState } from "react"
import styles from "./styles.module.css"

const EditProfileComponent = () => {
    const [modal, setModal] = useState(false)

    const hundleModalClick = () => {
        setModal(true)
    }

    return (
        <>
            <Button variant="Default" onClick={hundleModalClick}>profileの編集</Button>
            {modal ? 
            <div role="dialog" aria-modal="true" className={styles.modal} onClick={() => setModal(false)}>
                <div className={styles.modalIn} onClick={(e) => e.stopPropagation()}>

                </div>
            </div> : 
            <p>falseだよ</p>
            }
        </>
    )
}

export default EditProfileComponent