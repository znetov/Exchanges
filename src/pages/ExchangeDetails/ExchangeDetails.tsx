import React from "react"
import { useParams } from "react-router-dom"

const ExchangeDetails = () => {
    const params = useParams()
    const pair = params.pair
    return (
        <span>Exchange Details {pair}</span>
    )
}

export default ExchangeDetails