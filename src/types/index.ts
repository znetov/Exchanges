export type modalProps = {
    title: string
    visible: boolean
    onClose: () => void
    popupData: { key: "Binance" | "Bitfinex" | "Huobi" | "Kraken", data: any }
}


export type binanceDetailsResponseFormat = {
    id: number
    isBestMatch: boolean
    isBuyerMaker: boolean
    price: string
    qty: string
    quoteQty: string
    time: number
}

export type ResultsTableProps = { 
    binanceData: number
    bitfinexData: number
    huobiData: number
    krakenData: number
    pair: string
}

export type searchFormProps = {
    initialValue?: string
}