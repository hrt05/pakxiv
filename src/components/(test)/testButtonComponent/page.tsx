'use client'

import { Button } from "@charcoal-ui/react"

const TestButtonComponent = () => {
    const hunndleClick = async () => {
        const response = await fetch("/api/test", {method: "POST"})

        if (response.ok) {
            console.log("てええすと" ,response)
            const body = await response.json()
            console.log("てええすと２", body)
        }
    }

    return(
        <div>
            <p>button発火テストコンポーネント</p>
            <Button onClick={hunndleClick}>押下！</Button>
        </div>
    )
}

export default TestButtonComponent