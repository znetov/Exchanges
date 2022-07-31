import React, { BaseSyntheticEvent, useState, useRef, useEffect, useCallback } from "react"
import { getBinanceExchanges, getBitfinexExchanges, getHuobiExchanges, getKrakenExchanges } from "../../services/exchanges"
import ResultsTable from "../ResultsTable"
import binanceResponseFormatter from "../../utils/binanceResponseFormatter"
import huobiResponseFormatter from "../../utils/huobiResponseFormatter"
import krakenResponseFormatter from "../../utils/krakenResponseFormatter"
import bitfinexResponseFormatter from "../../utils/bitfinexResponseFormatter"

type searchFormProps = {
    initialValue?: string
}

const SearchForm = function(props: searchFormProps){
    const {initialValue} = props
    const [tableData, setTableData] = useState<{ platform: string; price: number; }[]>([])
    const [pair, setPair] = useState("")

    useEffect(()=> {
        if(initialValue !== undefined){
            getData(initialValue)
        }
    },[initialValue])

    const refreshData = useCallback((value:string) => {
        const interval = setInterval(() => {
            getData(value)
        }, 10000)

        return () => clearInterval(interval)
    }, [])

    const getData = useCallback((value:string)=>{
        setTableData([])
        let queryParamBinance = {"symbol": value.toUpperCase()}
        let queryParamHuobi = {"symbol": value.toLowerCase()}
        let queryParamKraken = {"pair":  value.toUpperCase()}
        getBinanceExchanges("/ticker/price",queryParamBinance ).then((res:any) => { //change to proper response format
            let formated = binanceResponseFormatter(res)
            setTableData(current => [...current, formated])
        }).catch((er)=>{
            debugger //set data with invalid symbol
        })
        getBitfinexExchanges(`/v2/ticker/t${value.toUpperCase()}`, {} ).then((res:any) => { //change to proper response format
            let formated = bitfinexResponseFormatter(res)
            setTableData(current => [...current, formated])
        }).catch((er)=>{
            debugger //set data with invalid symbol
        })
        getHuobiExchanges("/trade", queryParamHuobi).then((res:any)=>{ //todo change to proper response format
           if(res.status === 'ok'){
                let formated = huobiResponseFormatter(res)
                setTableData(current => [...current, formated])
           }
        }).catch((er)=>{
            debugger //set data with invalid symbol
        })
        getKrakenExchanges("/0/public/Ticker", queryParamKraken).then((res:any)=>{
            let formated = krakenResponseFormatter(res)
            setTableData(current => [...current, formated])
        }).catch((er)=>{
            console.error(er)
        })
    },[])

    const handleSubmit = (e:BaseSyntheticEvent) => {
        e.preventDefault()
        let value:string = e.target.children[0].value
        setPair(value)
        value = value.replace("/", "")
        getData(value)
        refreshData(value)
    }
    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    className="form-input"
                    type="text"
                    defaultValue={initialValue}
                />
                <button className="form-button" type="submit">Search</button>
            </form>
            <div id="apiTest"></div>
            <ResultsTable data={tableData} pair={pair}/>
        </>        
    )
}

export default SearchForm