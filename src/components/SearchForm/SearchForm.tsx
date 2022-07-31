import React, { BaseSyntheticEvent, useState, useEffect, useCallback } from "react"
import { getBinanceExchanges, getBitfinexExchanges, getHuobiExchanges, getKrakenExchanges } from "../../services/exchanges"
import ResultsTable from "../ResultsTable"
import binanceResponseFormatter from "../../utils/binanceResponseFormatter"
import huobiResponseFormatter from "../../utils/huobiResponseFormatter"
import krakenResponseFormatter from "../../utils/krakenResponseFormatter"
import bitfinexResponseFormatter from "../../utils/bitfinexResponseFormatter"

type searchFormProps = {
    initialValue?: string
}

const SearchForm = function (props: searchFormProps) {
    const { initialValue } = props
    const [binanceData, setBinanceData] = useState(-1)
    const [bitfinexData, setBitfinexData] = useState(-1)
    const [krakenData, setKrakenData] = useState(-1)
    const [huobiData, setHuobiData] = useState(-1)
    const [pair, setPair] = useState("")

    useEffect(() => {
        if (initialValue !== undefined) {
            getData(initialValue)
            refreshData(initialValue)
        }
    }, [initialValue])

    const refreshData = useCallback((value: string) => {
        const interval = setInterval(() => {
            getData(value)
        }, 10000)

        return () => clearInterval(interval)
    }, [])

    const getData = useCallback((value: string) => {
        let queryParamBinance = { "symbol": value.toUpperCase() }
        let queryParamHuobi = { "symbol": value.toLowerCase() }
        let queryParamKraken = { "pair": value.toUpperCase() }
        getBinanceExchanges("/ticker/price", queryParamBinance).then((res: any) => {
            let formated = binanceResponseFormatter(res)
            setBinanceData(formated);

        }).catch((er) => {
            setBinanceData(-404)
        })
        getBitfinexExchanges(`/v2/ticker/t${value.toUpperCase()}`, {}).then((res: any) => {
            let formated = bitfinexResponseFormatter(res)
            setBitfinexData(formated);
        }).catch((er) => {
            setBitfinexData(-404)
        })
        getHuobiExchanges("/trade", queryParamHuobi).then((res: any) => {
            if (res.status === 'ok') {
                let formated = huobiResponseFormatter(res)
                setHuobiData(formated);
            }
        }).catch((er) => {
            setHuobiData(-404)
        })
        getKrakenExchanges("/0/public/Ticker", queryParamKraken).then((res: any) => {
            let formated = krakenResponseFormatter(res)
            setKrakenData(formated);
        }).catch((er) => {
            console.error(er)
        })
    }, [])

    const handleSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault()
        let value: string = e.target.children[0].value
        setPair(value)
        value = value.replace("/", "")
        getData(value)
        refreshData(value)
    }
    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    placeholder="ETH/BTC"
                    className="form-input"
                    type="text"
                    defaultValue={initialValue}
                />
                <button className="form-button" type="submit">Search</button>
            </form>
            <div id="apiTest"></div>
            <ResultsTable binanceData={binanceData} bitfinexData={bitfinexData} huobiData={huobiData} krakenData={krakenData} pair={pair} />
        </>
    )
}

export default SearchForm