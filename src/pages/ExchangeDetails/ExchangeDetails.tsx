import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Modal from "../../components/Modal"
import { getBinanceExchanges, getBitfinexExchanges, getHuobiExchanges, getKrakenExchanges } from '../../services/exchanges'

const ExchangeDetails = () => {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState<any>({ key: "", data: [] })
    const params = useParams()
    const pair = params.pair || ""

    useEffect(() => {
        getBitfinexExchanges(`/v2/trades/t${pair.toUpperCase()}/hist`, { "limit": "15" }).then((res) => { 
            let identifier = { key: "Bitfinex", data: res }
            setData(identifier);
            setVisible(true);
        })
    }, [])

    const handleButtonClick = (platform: "Binance" | "Bitfinex" | "Huobi" | "Kraken") => {
        let searchString = pair

        let queries = {
            "Binance": { "symbol": searchString.toUpperCase(), "limit": "15" },
            "Bitfinex": { "limit": "15" },
            "Huobi": { "symbol": searchString.toLowerCase(), "size": "15" },
            "Kraken": { "pair": searchString.toUpperCase() }
        }
        let paths = {
            "Binance": "/api/v3/trades",
            "Bitfinex": `/v2/trades/t${searchString.toUpperCase()}/hist`,
            "Huobi": "/market/history/trade",
            "Kraken": "/0/public/Trades" //returns last 1000 trades no limit
        }

        let query = queries[platform]
        let path = paths[platform]


        if (platform === "Binance") { //TODO catch the case when failing
            getBinanceExchanges(path, query).then((res) => {
                let identifier = { key: "Binance", data: res }
                setData(identifier);
                setVisible(true);
            })
        } else if (platform === "Bitfinex") {
            getBitfinexExchanges(path, query).then((res) => {
                let identifier = { key: "Bitfinex", data: res }
                setData(identifier);
                setVisible(true);
            })
        } else if (platform === "Huobi") {
            getHuobiExchanges(path, query).then((res: any) => {
                let data = []
                for (let item of res.data) {
                    data.push(item.data[0])
                }
                let identifier = { key: "Huobi", data: data }
                setData(identifier);
                setVisible(true);
            })
        } else {
            getKrakenExchanges(path, query).then((res: any) => {
                if (res.error.length === 0) {
                    let last15 = res.result[Object.keys(res.result)[0]].slice(0, 15)
                    let identifier = { key: "Kraken", data: last15 }
                    setData(identifier);
                    setVisible(true);
                } else {
                    //todo show popup with error msg
                }
            })
        }
    }

    return (
        <>
            <h2 className="header">Criptocurrencies exchange rates comparison</h2>
            <div className="details-section">
                <button className="details-button" id="Binance" onClick={(e) => {
                    //@ts-expect-error id possibly null
                    handleButtonClick(e.currentTarget.id)
                }}>Binance</button>
                <button className="details-button" id="Bitfinex" onClick={(e) => {
                    //@ts-expect-error id possibly null
                    handleButtonClick(e.currentTarget.id)
                }}>Bitfinex</button>
                <button className="details-button" id="Huobi" onClick={(e) => {
                    //@ts-expect-error id possibly null
                    handleButtonClick(e.currentTarget.id)
                }}>Huobi</button>
                <button className="details-button" id="Kraken" onClick={(e) => {
                    //@ts-expect-error id possibly null
                    handleButtonClick(e.currentTarget.id)
                }}>Kraken</button>
            </div>
            <div className="criptocurrency">
                <img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4gPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NjYiIGhlaWdodD0iNDY1IiB2aWV3Qm94PSIwIDAgNTY2IDQ2NSIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTQ4MC45MzIgMTYzLjE1Nkw0MjIuMTgxIDEyOS4yNjFMMzA4LjA2OSAyMTMuOTk4TDI3OC42OTMgMTk1LjkyMUwyMzUuNzYgMjMzLjIwNSIgc3Ryb2tlPSJ3aGl0ZSI+PC9wYXRoPjxjaXJjbGUgY3g9IjQyNC4yOCIgY3k9IjEzMC41MjkiIHI9IjQuMTUwNTIiIHRyYW5zZm9ybT0icm90YXRlKC0xODAgNDI0LjI4IDEzMC41MjkpIiBmaWxsPSIjNUI4NEMwIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIzMDkuMDM4IiBjeT0iMjE0LjY5OSIgcj0iNC4xNTA1MiIgdHJhbnNmb3JtPSJyb3RhdGUoLTE4MCAzMDkuMDM4IDIxNC42OTkpIiBmaWxsPSIjNUI4NEMwIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIyNzkuNjYyIiBjeT0iMTk2LjYyNSIgcj0iNC4xNTA1MiIgdHJhbnNmb3JtPSJyb3RhdGUoLTE4MCAyNzkuNjYyIDE5Ni42MjUpIiBmaWxsPSIjNUI4NEMwIj48L2NpcmNsZT48Y2lyY2xlIGN4PSIyMzQuNDciIGN5PSIyMzUuMDM3IiByPSI0LjE1MDUyIiB0cmFuc2Zvcm09InJvdGF0ZSgtMTgwIDIzNC40NyAyMzUuMDM3KSIgZmlsbD0iIzVCODRDMCI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iNDgzLjAzMSIgY3k9IjE2NC40MjYiIHI9IjQuMTUwNTIiIHRyYW5zZm9ybT0icm90YXRlKC0xODAgNDgzLjAzMSAxNjQuNDI2KSIgZmlsbD0iIzVCODRDMCI+PC9jaXJjbGU+PHBhdGggZD0iTTM2My44NjIgMTkzLjc3TDI5OS4wMDEgMjMxLjE5TDE3My4wMjEgMTM3LjY0TDE0MC41OSAxNTcuNTk3TDkzLjE5MTUgMTE2LjQzNiIgc3Ryb2tlPSJ3aGl0ZSI+PC9wYXRoPjxjaXJjbGUgcj0iNC41ODIxOCIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgMzAxLjMxOSAyMjkuNzkxKSIgZmlsbD0iIzVCODRDMCI+PC9jaXJjbGU+PGNpcmNsZSByPSI0LjU4MjE4IiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSAxNzQuMDkxIDEzNi44NjkpIiBmaWxsPSIjNUI4NEMwIj48L2NpcmNsZT48Y2lyY2xlIHI9IjQuNTgyMTgiIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDE0MS42NiAxNTYuODIpIiBmaWxsPSIjNUI4NEMwIj48L2NpcmNsZT48Y2lyY2xlIHI9IjQuNTgyMTgiIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDkxLjc2ODUgMTE0LjQxNCkiIGZpbGw9IiM1Qjg0QzAiPjwvY2lyY2xlPjxjaXJjbGUgcj0iNC41ODIxOCIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgMzY2LjE4IDE5Mi4zNzEpIiBmaWxsPSIjNUI4NEMwIj48L2NpcmNsZT48cGF0aCBkPSJNMjY5LjQ4NSA0MzEuNjhDNDEyLjQ0IDQ0Ny45NTggNTQ3LjE3NCA0MzEuNjggNTQ5LjY3NSAzOTYuNDVDNTQ5LjY3NSAzODIuNzU4IDQzMC45NSAzNzEuNjU4IDI4NC40OTYgMzcxLjY1OEMxMzguMDQxIDM3MS42NTggMTUuMDI3MiAzODIuNzU4IDE1LjAyNzIgMzk2LjQ1QzE1LjAyNzIgNDEwLjE0MiAxNDcuMjYgNDE3Ljc2MiAyNjkuNDg1IDQzMS42OFoiIGZpbGw9IiMzNTQxODAiPjwvcGF0aD48cmVjdCB4PSI5Mi4yMjIiIHk9IjI5OS4xNTgiIHdpZHRoPSI5LjcxOTMyIiBoZWlnaHQ9IjY3LjkwOTkiIHN0cm9rZT0id2hpdGUiPjwvcmVjdD48cmVjdCB4PSIxMDkuMDY2IiB5PSIzMjUuMTk1IiB3aWR0aD0iOS43MTkzMiIgaGVpZ2h0PSI0MS44NzczIiBzdHJva2U9IndoaXRlIj48L3JlY3Q+PHJlY3QgeD0iMTI1LjkxMSIgeT0iMjg4LjQ0MSIgd2lkdGg9IjkuNzE5MzIiIGhlaWdodD0iNzguNjI5MiIgc3Ryb2tlPSJ3aGl0ZSI+PC9yZWN0PjxyZWN0IHg9IjE0Mi43NTUiIHk9IjI3MS41OTgiIHdpZHRoPSI5LjcxOTMyIiBoZWlnaHQ9Ijk1LjQ3MzgiIHN0cm9rZT0id2hpdGUiPjwvcmVjdD48cGF0aCBkPSJNMzk1LjQyNSAzODcuMzVDMzk1LjQyNSAzODcuMzUgMzgxLjQ3IDM5My4yMzMgMzUwLjEwMyAzOTUuNzA3QzMzMi45MzEgMzk3LjA0NSAzMTAuNTM1IDM5Ny4zNTEgMjgyLjM1IDM5NS4wOUMyMDIuNjg1IDQwMS40ODYgMTY5LjI3NiAzODcuMzUgMTY5LjI3NiAzODcuMzVDMTA3LjQ4NiAzMjQuMjU2IDE3OS41NzQgMTg5LjA2OSAyMDUuMzIgMTU2Ljg3QzIxNy4yMjIgMTQxLjk5NiAyMzQuNjEyIDEzNS45MjMgMjQ5Ljg4MSAxMzMuNjg1QzI2MC42NDkgMTMyLjE0MSAyNzEuNTggMTMyLjEzMSAyODIuMzUgMTMzLjY1NkMyOTMuMTIyIDEzMi4xMzEgMzA0LjA1NiAxMzIuMTQxIDMxNC44MjUgMTMzLjY4NUMzMjIuOTQ0IDEzNC44NzMgMzMxLjY2OCAxMzcuMTQ1IDMzOS44MzkgMTQxLjI2M0MzNDcuNDA4IDE0NC45ODIgMzU0LjA3NSAxNTAuMzA4IDM1OS4zNzUgMTU2Ljg3QzM4NS4xMjYgMTg5LjA2OSA0NTcuMjE1IDMyNC4yNTYgMzk1LjQyNSAzODcuMzVaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMTcyOF8zNjApIj48L3BhdGg+PHBhdGggZD0iTTM0My43MTMgNTMuOTY5NEMzNDMuNzEzIDUzLjk2OTQgMzM3LjMxOCAyMy4zNjkgMjg0LjQyMSA0OS45Njg2QzIzMS41MjMgNzYuNTY4MyAzMzEuNzMyIDcwLjU0NDIgMzMxLjczMiA3MC41NDQyQzMzMS43MzIgNzAuNTQ0MiAzNDQuMzY0IDYyLjkwMjcgMzQzLjcxMyA1My45Njk0WiIgZmlsbD0iIzRGQTM5QSI+PC9wYXRoPjxwYXRoIGQ9Ik0yNDAuMTg0IDEwMi4wNzlDMjQwLjE4NCAxMDIuMDc5IDIwNC43MTkgNjIuODQ2NCAyMjQuMDcyIDQ1LjQzOThDMjM5LjI1MyAzMS44MDA4IDI4My4xOTYgNDkuNDc4NSAzMDEuNDUyIDU3LjcxMTZDMzA5LjMyIDYxLjMwNzkgMzE3Ljg2NyA2My4xODgyIDMyNi41MiA2My4yMjcyQzMzNS4wMjcgNjMuMjI3MiAzNDMuNTc0IDYxLjUzNjcgMzQzLjczNiA1NC43NzQ5QzM0My43MzYgNTQuNzc0OSAzNDQuMzE0IDg0LjY1NTEgMzIyLjI1NiAxMDIuMDg1QzMwMC4xOTggMTE5LjUxNCAyNDAuMTg0IDEwMi4wNzkgMjQwLjE4NCAxMDIuMDc5WiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzE3MjhfMzYwKSI+PC9wYXRoPjxwYXRoIGQ9Ik0yODEuMDE2IDEwOC42NzVDMjgxLjAxNiAxMDguNjc1IDMwNy41NjIgOTkuNjY3NyAzMTUuNzEzIDgxLjgwNDdDMzE1LjcxMyA4MS44MDQ3IDMxNS4zODYgOTkuMDE2IDMwMi42NzEgMTA1LjgzNUMyODkuOTU2IDExMi42NTUgMjgxLjAxNiAxMDguNjc1IDI4MS4wMTYgMTA4LjY3NVoiIGZpbGw9IiM0RkEzOUEiPjwvcGF0aD48cGF0aCBkPSJNMzIyLjc2NyAxMDEuODIySDI0MC42QzIzNi4zODkgMTAxLjgyMiAyMzIuOTc0IDEwNS4xNTEgMjMyLjk3NCAxMDkuMjU3VjExMC40MDJDMjMyLjk3NCAxMTQuNTA4IDIzNi4zODkgMTE3LjgzNiAyNDAuNiAxMTcuODM2SDMyMi43NjdDMzI2Ljk3OSAxMTcuODM2IDMzMC4zOTMgMTE0LjUwOCAzMzAuMzkzIDExMC40MDJWMTA5LjI1N0MzMzAuMzkzIDEwNS4xNTEgMzI2Ljk3OSAxMDEuODIyIDMyMi43NjcgMTAxLjgyMloiIGZpbGw9IiMyNjJGNjMiPjwvcGF0aD48cGF0aCBkPSJNMjE0LjI5IDM3Ni43MzJDMjE0LjI5IDM3Ni43MzIgMjg2LjA3MyA0MTUuNzY3IDM1MC40MSAzNzYuNzMyQzM1MC40MSAzNzYuNzMyIDI4Mi44NzMgMzg4LjUwOCAyMTQuMjkgMzc2LjczMloiIGZpbGw9IiM0RkEzOUEiPjwvcGF0aD48cGF0aCBkPSJNMjQwLjk3OSA3MS4xMzA5QzI0MC45NzkgNzEuMTMwOSAyNDUuNzgyIDk3LjgyODkgMjY1IDEwMS44MjRDMjY1IDEwMS44MjQgMjQzLjg2NiA4Mi45NjM4IDI0MC45NzkgNzEuMTMwOVoiIGZpbGw9IiM0RkEzOUEiPjwvcGF0aD48cGF0aCBkPSJNMTgxLjg0MiAyNjQuNjMzQzE4MS44NDIgMjY0LjYzMyAxNzMuMDEgMzE3LjM5NCAyMTAuMjg4IDMzMS4zNThDMjEwLjI4OCAzMzEuMzU4IDE3OS44NzkgMjkzLjQ2NCAxODEuODQyIDI2NC42MzNaIiBmaWxsPSIjNEZBMzlBIj48L3BhdGg+PHBhdGggb3BhY2l0eT0iMC4zNCIgZD0iTTI3Ni4zNDcgMjczLjk3NEMzMDIuNTExIDI3My45NzQgMzIzLjcyMSAyNTIuNzY0IDMyMy43MjEgMjI2LjU5OUMzMjMuNzIxIDIwMC40MzUgMzAyLjUxMSAxNzkuMjI1IDI3Ni4zNDcgMTc5LjIyNUMyNTAuMTgyIDE3OS4yMjUgMjI4Ljk3MiAyMDAuNDM1IDIyOC45NzIgMjI2LjU5OUMyMjguOTcyIDI1Mi43NjQgMjUwLjE4MiAyNzMuOTc0IDI3Ni4zNDcgMjczLjk3NFoiIGZpbGw9IiMwQTBBMEEiPjwvcGF0aD48cGF0aCBkPSJNMzIyLjc3IDExNy44MzhIMjQwLjU5N0MyMzYuMzg3IDExNy44MzggMjMyLjk3NCAxMjEuMTI0IDIzMi45NzQgMTI1LjE3OEMyMzIuOTc0IDEyOS4yMzEgMjM2LjM4NyAxMzIuNTE3IDI0MC41OTcgMTMyLjUxN0gzMjIuNzdDMzI2Ljk4IDEzMi41MTcgMzMwLjM5MyAxMjkuMjMxIDMzMC4zOTMgMTI1LjE3OEMzMzAuMzkzIDEyMS4xMjQgMzI2Ljk4IDExNy44MzggMzIyLjc3IDExNy44MzhaIiBmaWxsPSIjMjYyRjYzIj48L3BhdGg+PHBhdGggZD0iTTI4Mi4zNDkgMjY4LjYzM0MzMDguODgyIDI2OC42MzMgMzMwLjM5MiAyNDcuMTI0IDMzMC4zOTIgMjIwLjU5MUMzMzAuMzkyIDE5NC4wNTggMzA4Ljg4MiAxNzIuNTQ5IDI4Mi4zNDkgMTcyLjU0OUMyNTUuODE3IDE3Mi41NDkgMjM0LjMwNyAxOTQuMDU4IDIzNC4zMDcgMjIwLjU5MUMyMzQuMzA3IDI0Ny4xMjQgMjU1LjgxNyAyNjguNjMzIDI4Mi4zNDkgMjY4LjYzM1oiIGZpbGw9IiNFQkYyRkMiPjwvcGF0aD48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI4Mi45MyAyMzEuMDM1QzI3NS4wNTYgMjMxLjAzMiAyNjguNjg3IDIyNC43NiAyNjguNjk3IDIxNy4wMjhDMjY4LjcxMyAyMDkuMjkzIDI3NS4xMDMgMjAzLjAyOSAyODIuOTc0IDIwMy4wMzFDMjg4LjAzOSAyMDMuMDEyIDI5Mi43MzQgMjA1LjY3OCAyOTUuMzEyIDIxMC4wMzdMMzAzLjEzMSAyMTAuMDRDMzAxLjE3NyAyMDQuNjUyIDI5Ny4xMjMgMjAwLjI4NyAyOTEuODk1IDE5Ny45NEwyOTEuOTA5IDE4OS4wMzZMMjg1LjcxMiAxODkuMDMzVjE5Ni4yMjJDMjg0Ljc5NCAxOTYuMDkxIDI4My44NTkgMTk2LjAxNyAyODIuOTAyIDE5Ni4wMTdDMjgyLjAwMSAxOTYuMDE3IDI4MS4xMTggMTk2LjA4NCAyODAuMjQ3IDE5Ni4xOThWMTg5LjAzTDI3NC4wODcgMTg5LjAyOUwyNzQuMDczIDE5Ny45MzNDMjY2LjcwNyAyMDEuMjUgMjYxLjU4MiAyMDguNTUgMjYxLjU3IDIxNy4wMjVDMjYxLjU1NiAyMjUuNSAyNjYuNjU2IDIzMi44MDQgMjc0LjAxMSAyMzYuMTI1TDI3My45OTggMjQ1LjAyOUwyODAuMjQ4IDI0NS4wMzJWMjM3Ljg2N0MyODEuMTE4IDIzNy45ODEgMjgyLjAwMSAyMzguMDQ5IDI4Mi45MDMgMjM4LjA0OUMyODMuODU5IDIzOC4wNDkgMjg0Ljc5NCAyMzcuOTc0IDI4NS43MTMgMjM3Ljg0M1YyNDUuMDM2TDI5MS44MiAyNDUuMDM3TDI5MS44MzMgMjM2LjEzNEMyOTcuMDcxIDIzMy43ODkgMzAxLjEzNyAyMjkuNDI4IDMwMy4xMDkgMjI0LjAzOEgyOTUuMjkxQzI5Mi42OTkgMjI4LjM5MyAyODcuOTk4IDIzMS4wNTMgMjgyLjkyOSAyMzEuMDM1TDI4Mi45MyAyMzEuMDM1WiIgZmlsbD0iIzI2MkY2MyI+PC9wYXRoPjxyZWN0IHg9IjQwMy42OSIgeT0iMzQ2LjI0MiIgd2lkdGg9Ijg0LjM2ODMiIGhlaWdodD0iMTQuMjE5NCIgcng9IjMiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8xNzI4XzM2MCkiPjwvcmVjdD48cmVjdCB4PSIzOTEuMzY2IiB5PSIzMTcuNzk5IiB3aWR0aD0iODQuMzY4MyIgaGVpZ2h0PSIxNC4yMTk0IiByeD0iMyIgZmlsbD0idXJsKCNwYWludDNfbGluZWFyXzE3MjhfMzYwKSI+PC9yZWN0PjxyZWN0IHg9IjM5OC45NSIgeT0iMzYwLjQ1OSIgd2lkdGg9Ijg0LjM2ODMiIGhlaWdodD0iMTQuMjE5NCIgcng9IjMiIGZpbGw9InVybCgjcGFpbnQ0X2xpbmVhcl8xNzI4XzM2MCkiPjwvcmVjdD48cmVjdCB4PSIzODYuNjI2IiB5PSIzMzIuMDIxIiB3aWR0aD0iODQuMzY4MyIgaGVpZ2h0PSIxNC4yMTk0IiByeD0iMyIgZmlsbD0idXJsKCNwYWludDVfbGluZWFyXzE3MjhfMzYwKSI+PC9yZWN0PjxyZWN0IHg9IjQwMy42OSIgeT0iMzc0LjY4IiB3aWR0aD0iODQuMzY4MyIgaGVpZ2h0PSIxNC4yMTk0IiByeD0iMyIgZmlsbD0idXJsKCNwYWludDZfbGluZWFyXzE3MjhfMzYwKSI+PC9yZWN0PjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDkwLjUxIDI3My4wMzlMNDIzLjUxMSAzMDIuNEw0MjYuOTI4IDMxMC4xOThMNDI2LjkzIDMxMC4xOTdDNDI2LjkzIDMxMC4xOTcgNDI2LjkzIDMxMC4xOTcgNDI2LjkzIDMxMC4xOThDNDI4LjM5OCAzMTMuNTQ3IDQ0NC41ODYgMzA5LjY4OSA0NjMuMDg3IDMwMS41ODJDNDgxLjU4OCAyOTMuNDc0IDQ5NS4zOTcgMjg0LjE4NiA0OTMuOTI5IDI4MC44MzZDNDkzLjkyMSAyODAuODE4IDQ5My45MTIgMjgwLjc5OSA0OTMuOTAzIDI4MC43ODFMNDkwLjUxIDI3My4wMzlaIiBmaWxsPSIjRThBMzQxIj48L3BhdGg+PGVsbGlwc2UgY3g9IjQ1Ny4wMTUiIGN5PSIyODcuNzIiIHJ4PSIzNi41NzUyIiByeT0iNi42MjEzNyIgdHJhbnNmb3JtPSJyb3RhdGUoLTIzLjY2NDUgNDU3LjAxNSAyODcuNzIpIiBmaWxsPSIjRjNCRjc1Ij48L2VsbGlwc2U+PGVsbGlwc2UgY3g9IjQ1Ny4wMTQiIGN5PSIyODcuNzIiIHJ4PSIzMS41MzAzIiByeT0iNS42NzU0NiIgdHJhbnNmb3JtPSJyb3RhdGUoLTIzLjY2NDUgNDU3LjAxNCAyODcuNzIpIiBmaWxsPSIjRThBMzQxIj48L2VsbGlwc2U+PGVsbGlwc2UgY3g9IjQ1Ny4zOTgiIGN5PSIyODguNTg3IiByeD0iMzAuMjY5MSIgcnk9IjQuNzI5NTUiIHRyYW5zZm9ybT0icm90YXRlKC0yMy42NjQ1IDQ1Ny4zOTggMjg4LjU4NykiIGZpbGw9IiNGM0JGNzUiPjwvZWxsaXBzZT48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ0Mi42MTUgMjg4LjkwNEwzODEuNzUyIDI0OC4zMjRMMzc3LjAzIDI1NS40MDdMMzc3LjAzMSAyNTUuNDA4QzM3Ny4wMyAyNTUuNDA5IDM3Ny4wMyAyNTUuNDEgMzc3LjAyOSAyNTUuNDExQzM3NS4wMDEgMjU4LjQ1MyAzODYuOTgxIDI3MC4wMDQgNDAzLjc4NyAyODEuMjFDNDIwLjU5NCAyOTIuNDE2IDQzNS44NjMgMjk5LjAzMyA0MzcuODkyIDI5NS45OTFDNDM3LjkwMyAyOTUuOTc0IDQzNy45MTQgMjk1Ljk1NiA0MzcuOTI1IDI5NS45MzhMNDQyLjYxNSAyODguOTA0WiIgZmlsbD0iI0U4QTM0MSI+PC9wYXRoPjxlbGxpcHNlIGN4PSI0MTIuMTg2IiBjeT0iMjY4LjYxNiIgcng9IjM2LjU3NTIiIHJ5PSI2LjYyMTM3IiB0cmFuc2Zvcm09InJvdGF0ZSgzMy42OTM1IDQxMi4xODYgMjY4LjYxNikiIGZpbGw9IiNGM0JGNzUiPjwvZWxsaXBzZT48ZWxsaXBzZSBjeD0iNDEyLjE4NyIgY3k9IjI2OC42MTQiIHJ4PSIzMS41MzAzIiByeT0iNS42NzU0NiIgdHJhbnNmb3JtPSJyb3RhdGUoMzMuNjkzNSA0MTIuMTg3IDI2OC42MTQpIiBmaWxsPSIjRThBMzQxIj48L2VsbGlwc2U+PGVsbGlwc2UgY3g9IjQxMS42NjMiIGN5PSIyNjkuNDAzIiByeD0iMzAuMjY5MSIgcnk9IjQuNzI5NTUiIHRyYW5zZm9ybT0icm90YXRlKDMzLjY5MzUgNDExLjY2MyAyNjkuNDAzKSIgZmlsbD0iI0YzQkY3NSI+PC9lbGxpcHNlPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDA5Ljk3MSAyMjkuNDUxQzQwOS43NzQgMjI5LjMyMiA0MDkuNTk4IDIyOS4xNzEgNDA5LjQ0NSAyMjguOTk4QzQwNi4wMiAyMjUuMTA4IDQxNS4zNDcgMjExLjI5OSA0MzAuMjc3IDE5OC4xNTVDNDQ1LjE0MiAxODUuMDY5IDQ1OS45NTYgMTc3LjU3NSA0NjMuNDY1IDE4MS4zNDlMNDYzLjU2IDE4MS4yNjRMNDcxLjY1MSAxOTAuNDE5TDQxNy41NjIgMjM3Ljk1N0w0MDkuOTA4IDIyOS41MDhMNDA5Ljk3MSAyMjkuNDUxWiIgZmlsbD0iI0YzQkY3NSI+PC9wYXRoPjxlbGxpcHNlIGN4PSI0NDQuMjczIiBjeT0iMjEzLjkzOSIgcng9IjM2LjAxNjQiIHJ5PSI5LjM4Mzg0IiB0cmFuc2Zvcm09InJvdGF0ZSgtNDEuMzU5OCA0NDQuMjczIDIxMy45MzkpIiBmaWxsPSIjRThBMzQxIj48L2VsbGlwc2U+PGcgb3BhY2l0eT0iMC43Ij48cGF0aCBvcGFjaXR5PSIwLjQiIGQ9Ik01MjguMzM2IDMzMi44NjhDNTQwLjQyNyAzMzIuODY4IDU1MC4yMjkgMzIzLjA2MiA1NTAuMjI5IDMxMC45NjRDNTUwLjIyOSAyOTguODY3IDU0MC40MjcgMjg5LjA2MSA1MjguMzM2IDI4OS4wNjFDNTE2LjI0NCAyODkuMDYxIDUwNi40NDIgMjk4Ljg2NyA1MDYuNDQyIDMxMC45NjRDNTA2LjQ0MiAzMjMuMDYyIDUxNi4yNDQgMzMyLjg2OCA1MjguMzM2IDMzMi44NjhaIiBmaWxsPSIjMjQzMjZFIj48L3BhdGg+PHBhdGggZD0iTTUzNS42MDIgMzAwLjg4NUg1MzAuMjQ0VjI5OC4zNjlINTI2LjQzVjMwMC44ODVINTIxLjUyOFYzMDQuNjk5SDUzMC45NThMNTIxLjA2OCAzMTcuMDE5VjMyMS4wNDJINTI2LjQzVjMyMy41NjJINTMwLjI0NFYzMjEuMDQySDUzNS4xNDJWMzE3LjIyOEg1MjUuNzg5TDUzNS42MDIgMzA1LjAwOVYzMDAuODg1WiIgZmlsbD0iIzU3NjlCNSI+PC9wYXRoPjxwYXRoIG9wYWNpdHk9IjAuNCIgZD0iTTQ2OS4zMzQgMTEzLjcyNkM0OTAuMjIzIDExMy43MjYgNTA3LjE1NyA5Ni43ODQxIDUwNy4xNTcgNzUuODg1NEM1MDcuMTU3IDU0Ljk4NjcgNDkwLjIyMyAzOC4wNDQ5IDQ2OS4zMzQgMzguMDQ0OUM0NDguNDQ1IDM4LjA0NDkgNDMxLjUxMSA1NC45ODY3IDQzMS41MTEgNzUuODg1NEM0MzEuNTExIDk2Ljc4NDEgNDQ4LjQ0NSAxMTMuNzI2IDQ2OS4zMzQgMTEzLjcyNloiIGZpbGw9IiM3MDgzRDQiPjwvcGF0aD48cGF0aCBkPSJNNDg1LjI4NSA4Mi41MDcxQzQ4NS4yODUgNzkuMDUzMSA0ODMuNTA5IDc1Ljk4MDMgNDgwLjc4NyA3NC4wODE3QzQ4My41MzEgNzEuMjM3NyA0ODMuNjA4IDY3Ljk1MTQgNDgzLjU4NSA2Ny4yMzQ3QzQ4My41NjIgNjIuNDQ2NCA0ODAuNzY0IDU5LjUwMzIgNDc3LjQ3IDU3LjkzMjVWNTIuNDk2MUg0NzEuMTg3VjU2LjQ5OTFINDY0LjE4VjUyLjQ5NjFINDU3Ljg4OVY1Ni40OTkxSDQ1NC40NThWNjIuNDAwNkg0NTcuODk3Vjc1LjE0MTZWODYuOTA2Nkg0NTMuMzgzVjkyLjgwODFINDU3Ljg5N1Y5OS4yNzM5SDQ2NC4xOFY5Mi45NDU0SDQ3MS4xODdWOTkuMjczOUg0NzcuNDdWOTIuNTEwN0M0ODEuOTg0IDkxLjIxNDUgNDg1LjI4NSA4Ny4yMTkyIDQ4NS4yODUgODIuNTA3MVpNNDcxLjMwMSA2Mi4zOTNDNDcyLjM2OSA2Mi40MzExIDQ3Ny4zMDIgNjIuODQyOSA0NzcuMzAyIDY3LjI4MDVDNDc3LjMwMiA2Ny4zMzM4IDQ3Ny4zMDIgNjcuMzg3MiA0NzcuMzEgNjcuNDQwNkM0NzcuMzEgNjcuNDU1OCA0NzcuMzE3IDY4Ljk1MDMgNDc2LjA2NyA3MC4xODU1QzQ3NS4wNjggNzEuMTc2NyA0NzMuNDI5IDcxLjgxNzIgNDcxLjI3MSA3Mi4wNjEySDQ2NC4xOFY2Mi4zOTNINDcxLjMwMVpNNDc0LjMyOCA4Ny4wNDM4SDQ2NC4xOFY3OC4wOTI0SDQ2OS4wOUM0NjkuOTY3IDc4LjA5MjQgNDcwLjgwNiA3OC4wNTQyIDQ3MS42MTQgNzcuOTcwNEg0NzQuMzI4QzQ3Ni45MDYgNzcuOTcwNCA0NzkuMDAyIDgwLjAwNjIgNDc5LjAwMiA4Mi41MDcxQzQ3OS4wMDIgODUuMDA4IDQ3Ni45MDYgODcuMDQzOCA0NzQuMzI4IDg3LjA0MzhaIiBmaWxsPSIjMzg0ODhEIj48L3BhdGg+PHBhdGggb3BhY2l0eT0iMC40IiBkPSJNNzUuMTA4OSAyODMuNjM1QzkwLjg3MDcgMjgzLjYzNSAxMDMuNjQ4IDI3MC44NTEgMTAzLjY0OCAyNTUuMDgyQzEwMy42NDggMjM5LjMxMyA5MC44NzA3IDIyNi41MjkgNzUuMTA4OSAyMjYuNTI5QzU5LjM0NzIgMjI2LjUyOSA0Ni41Njk4IDIzOS4zMTMgNDYuNTY5OCAyNTUuMDgyQzQ2LjU2OTggMjcwLjg1MSA1OS4zNDcyIDI4My42MzUgNzUuMTA4OSAyODMuNjM1WiIgZmlsbD0iIzI0MzI2RSI+PC9wYXRoPjxwYXRoIGQ9Ik04NC42MjgzIDI1OS4wMzVDODQuNjI4MyAyNTYuOTc0IDgzLjU2OCAyNTUuMTQgODEuOTQzNiAyNTQuMDA3QzgzLjU4MTcgMjUyLjMxIDgzLjYyNzIgMjUwLjM0OSA4My42MTM1IDI0OS45MjFDODMuNTk5OSAyNDcuMDYzIDgxLjkyOTkgMjQ1LjMwNyA3OS45NjQyIDI0NC4zNjlWMjQxLjEyNUg3Ni4yMTQ3VjI0My41MTRINzIuMDMyOVYyNDEuMTI1SDY4LjI3ODlWMjQzLjUxNEg2Ni4yMzEzVjI0Ny4wMzZINjguMjgzNVYyNTQuNjM5VjI2MS42NjFINjUuNTg5N1YyNjUuMTgzSDY4LjI4MzVWMjY5LjA0MUg3Mi4wMzI5VjI2NS4yNjVINzYuMjE0N1YyNjkuMDQxSDc5Ljk2NDJWMjY1LjAwNUM4Mi42NTggMjY0LjIzMiA4NC42MjgzIDI2MS44NDcgODQuNjI4MyAyNTkuMDM1Wk03Ni4yODI5IDI0Ny4wMzFDNzYuOTIgMjQ3LjA1NCA3OS44NjQxIDI0Ny4zIDc5Ljg2NDEgMjQ5Ljk0OEM3OS44NjQxIDI0OS45OCA3OS44NjQxIDI1MC4wMTIgNzkuODY4NiAyNTAuMDQ0Qzc5Ljg2ODYgMjUwLjA1MyA3OS44NzMyIDI1MC45NDUgNzkuMTI2OSAyNTEuNjgyQzc4LjUzMDggMjUyLjI3MyA3Ny41NTI1IDI1Mi42NTYgNzYuMjY0NyAyNTIuODAxSDcyLjAzMjlWMjQ3LjAzMUg3Ni4yODI5Wk03OC4wODk0IDI2MS43NDNINzIuMDMyOVYyNTYuNEg3NC45NjM0Qzc1LjQ4NjYgMjU2LjQgNzUuOTg3MiAyNTYuMzc4IDc2LjQ2OTUgMjU2LjMyOEg3OC4wODk0Qzc5LjYyNzQgMjU2LjMyOCA4MC44Nzg4IDI1Ny41NDMgODAuODc4OCAyNTkuMDM1QzgwLjg3ODggMjYwLjUyOCA3OS42Mjc0IDI2MS43NDMgNzguMDg5NCAyNjEuNzQzWiIgZmlsbD0iIzcwODNENCI+PC9wYXRoPjxwYXRoIG9wYWNpdHk9IjAuNCIgZD0iTTkxLjcyMTggODEuODA1NEMxMDYuODUzIDgxLjgwNTQgMTE5LjExOCA2OS41MzM3IDExOS4xMTggNTQuMzk1OEMxMTkuMTE4IDM5LjI1OCAxMDYuODUzIDI2Ljk4NjMgOTEuNzIxOCAyNi45ODYzQzc2LjU5MTEgMjYuOTg2MyA2NC4zMjUyIDM5LjI1OCA2NC4zMjUyIDU0LjM5NThDNjQuMzI1MiA2OS41MzM3IDc2LjU5MTEgODEuODA1NCA5MS43MjE4IDgxLjgwNTRaIiBmaWxsPSIjNzA4M0Q0Ij48L3BhdGg+PHBhdGggZD0iTTExNC45ODIgNjMuODg1N0g5OS45NjMyVjU0LjUxMzlMOTEuOTIwMSA2Mi43NDc2TDgzLjI1NjEgNTMuNzUxNVY2My44ODU3SDY4LjQ2MDVWNTguOTkwMUg3OC4zNjZWNDEuNjEzM0w5MS45NDczIDU1LjcxNzNMMTA0Ljg1MyA0Mi40OTU1VjU4Ljk5MDFIMTE0Ljk4MlY2My44ODU3WiIgZmlsbD0iIzI0MzI2RSI+PC9wYXRoPjwvZz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTcyOF8zNjAiIHgxPSIyODIuMTU5IiB5MT0iMzY2Ljg3MiIgeDI9IjI4Mi4xNTkiIHkyPSIxNTMuOTYzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzc0QzBCOCI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzRFQTM5OSI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzE3MjhfMzYwIiB4MT0iMjgwLjkyOCIgeTE9IjEwMS45ODMiIHgyPSIyODAuOTI4IiB5Mj0iNDYuMDY3MSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiM3NEMwQjgiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM0RUEzOTkiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQyX2xpbmVhcl8xNzI4XzM2MCIgeDE9IjQ1NS42MDgiIHkxPSIzNjIuMzU3IiB4Mj0iNDU2LjUwMSIgeTI9IjM0NS42NDgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjRThBMzQxIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIwLjk4IiBzdG9wLWNvbG9yPSIjRjNCRjc1Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50M19saW5lYXJfMTcyOF8zNjAiIHgxPSI0NDMuMjg1IiB5MT0iMzMzLjkxNCIgeDI9IjQ0NC4xNzciIHkyPSIzMTcuMjA0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0U4QTM0MSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMC45OCIgc3RvcC1jb2xvcj0iI0YzQkY3NSI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDRfbGluZWFyXzE3MjhfMzYwIiB4MT0iNDUwLjg2OSIgeTE9IjM3Ni41NzQiIHgyPSI0NTEuNzYxIiB5Mj0iMzU5Ljg2NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNFOEEzNDEiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjAuOTgiIHN0b3AtY29sb3I9IiNGM0JGNzUiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQ1X2xpbmVhcl8xNzI4XzM2MCIgeDE9IjQzOC41NDUiIHkxPSIzNDguMTM3IiB4Mj0iNDM5LjQzOCIgeTI9IjMzMS40MjciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjRThBMzQxIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIwLjk4IiBzdG9wLWNvbG9yPSIjRjNCRjc1Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Nl9saW5lYXJfMTcyOF8zNjAiIHgxPSI0NTUuNjA4IiB5MT0iMzkwLjc5NSIgeDI9IjQ1Ni41MDEiIHkyPSIzNzQuMDg1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0U4QTM0MSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMC45OCIgc3RvcC1jb2xvcj0iI0YzQkY3NSI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPiA=' />
            </div>
            <Modal visible={visible} onClose={() => { setVisible(false) }} title="Details" popupData={data} />
        </>
    )
}

export default ExchangeDetails