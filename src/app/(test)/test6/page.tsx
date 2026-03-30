'use client';

import styles from "./styles.module.css"
import { Button } from "@charcoal-ui/react";
import { useState } from "react";

const Test6 = () => {

    type Post = {
        id: string,
        title: string,
        description: string
        images: []
    }

    type Image = {
        id: string,
        path: string,
        postId: string
    }

    const [apiNakami, setApiNakami] = useState<Post[]>([])

    const handleSubmitTest6 = async () => {
        try {
            const result = await fetch("/api/postsList", {
                method: "GET"
            })

            if (result?.ok) {
                const body = await result.json()
                setApiNakami(body)
                console.log(body)
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Button onClick={handleSubmitTest6}>api発火テスト</Button>
            {/* {apiNakami ? <p> {`apiの中身テストです。${apiNakami}`} </p> : null} */}
            {apiNakami ? apiNakami.map((item) => <div key={item.id} className={styles.div1}>
                <p>{item.id}</p>
                <p>{item.title}</p>
                <p>{item.description}</p>
                {item.images.map((image: Image, index) => <p key={index}>{image.path}</p>)}
                {item.images.map((image: Image, index) => <img className={styles.img1} key={index} src={`https://バケットネーム.s3.ap-northeast-1.amazonaws.com/${image.path}`}/>)}
                {/* {item.images.map((path, index) => <ul key={index}><li>{path}</li></ul>)} */}
            </div>) : null}
        </div>
    )
}

export default Test6