import React from "react"

type modalProps = {
    title: string
    visible: boolean
    onClose: () => void
    popupData: { key: "Binance" | "Bitfinex" | "Huobi" | "Kraken", data: any }
}


type binanceDetailsResponseFormat = {
    id: number
    isBestMatch: boolean
    isBuyerMaker: boolean
    price: string
    qty: string
    quoteQty: string
    time: number
}

const binanceDetailsFormatter = (item: binanceDetailsResponseFormat, key: number) => {
    return (
        <section key={key} className="modal-details-section">

            {
                <>
                    <div><span>ID: </span><span>{item.id}</span></div>
                    <div><span>Price: </span><span>{item.price}</span></div>
                    <div><span>Quantity: </span><span>{item.qty}</span></div>
                    <div><span>Time: </span><span>{new Date(item.time).toString()}</span></div>
                </>
            }
        </section>
    )
}

const bitfinexDetailsFormatter = (item: number[], key: number) => {
    return (
        <section key={key} className="modal-details-section">

            {
                <>
                    <div><span>ID: </span><span>{item[0]}</span></div>
                    <div><span>Price: </span><span>{item[3]}</span></div>
                    <div><span>Quantity: </span><span>{item[2]}</span></div>
                    <div><span>Time: </span><span>{new Date(item[1]).toString()}</span></div>
                    <div><span>Transaction type: </span><span>{item[2] > 0 ? "BUY" : "SELL"}</span></div>
                </>
            }
        </section>
    )
}

const huobiDetailsFormatter = (item: any, key: number) => {
    return (
        <section key={key} className="modal-details-section">

            {
                <>
                    <div><span>ID: </span><span>{item["trade-id"]}</span></div>
                    <div><span>Price: </span><span>{item.price}</span></div>
                    <div><span>Quantity: </span><span>{item.amount}</span></div>
                    <div><span>Time: </span><span>{new Date(item.ts).toString()}</span></div>
                    <div><span>Transaction type: </span><span>{item.direction.toUpperCase()}</span></div>
                </>
            }
        </section>
    )
}

const krakenDetailsFormatter = (item: any[], key: number) => {
    return (
        <section key={key} className="modal-details-section">

            {
                <>
                    <div><span>Price: </span><span>{item[0]}</span></div>
                    <div><span>Quantity: </span><span>{item[1]}</span></div>
                    <div><span>Time: </span><span>{new Date(item[2] * 1000).toString()}</span></div>
                    <div><span>Transaction type: </span><span>{item[3] === "s" ? "SELL" : "BUY"}</span></div>
                </>
            }
        </section>
    )
}

const Modal = function (props: modalProps) {
    const { title, visible, onClose, popupData } = props
    if (!visible) {
        return null
    }

    const formatters = {
        "Binance": binanceDetailsFormatter,
        "Bitfinex": bitfinexDetailsFormatter,
        "Huobi": huobiDetailsFormatter,
        "Kraken": krakenDetailsFormatter
    }

    const callback = formatters[popupData.key]

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                </div>
                <div className="modal-body">
                    <h3>Last 15 trades</h3>
                    {popupData.data.map((item: any, key: number) => {
                        return (
                            callback(item, key)
                        )
                    })}
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} className="modal-button">Close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal