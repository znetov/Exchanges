import React, { BaseSyntheticEvent, useState, useRef, useEffect } from "react"
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
    const form = useRef(null)
    const input = useRef(null)

    // useEffect(()=>{
    //     //@ts-ignore ref possibly null
    //    input.current.dispatchEvent(
    //         new Event("change", {
    //             bubbles: true,
    //             cancelable: true,
    //         })
    //    )
    // },[])

    // const handleInputChange = (e:any) => {
    //     if(initialValue !== undefined){
    //         let searchForm = form.current
    //         //@ts-ignore ref possibly null
    //         searchForm && searchForm.submit()
    //     }
    //     return false
    // }

    const handleSubmit = (e:BaseSyntheticEvent) => {
        e.preventDefault()
        setTableData([])
        let value:string = e.target.children[0].value
        setPair(value)
        value = value.replace("/", "")
        let queryParamBinance = {"symbol": value.toUpperCase()}
        let queryParamHuobi = {"symbol": value.toLowerCase()}
        let queryParamKraken = {"pair":  value.toUpperCase()}
        getBinanceExchanges("/ticker/price",queryParamBinance ).then((res:any) => { //change to proper response format
            let formated = binanceResponseFormatter(res)
            setTableData(current => [...current, formated])
        }).catch((er)=>{
            debugger
        })
        getBitfinexExchanges(`/v2/ticker/t${value.toUpperCase()}`, {} ).then((res:any) => { //change to proper response format
            let formated = bitfinexResponseFormatter(res)
            setTableData(current => [...current, formated])
        }).catch((er)=>{
            debugger
        })
        getHuobiExchanges("/trade", queryParamHuobi).then((res:any)=>{ //todo change to proper response format
           if(res.status === 'ok'){
                let formated = huobiResponseFormatter(res)
                setTableData(current => [...current, formated])
           }
        }).catch((er)=>{
            debugger
        })
        getKrakenExchanges("/0/public/Ticker", queryParamKraken).then((res:any)=>{
            let formated = krakenResponseFormatter(res)
            setTableData(current => [...current, formated])
        }).catch((er)=>{
            debugger
        })
    }
    return (
        <>
            <form ref={form} onSubmit={handleSubmit}>
                <input 
                    ref={input}
                    onChange={(e)=> {
                        //handleInputChange(e)
                    }}
                    type="text"
                    value={initialValue}
                />
                <button type="submit">Search</button>
            </form>
            <div id="apiTest"></div>
            <ResultsTable data={tableData} pair={pair}/>
        </>        
    )
}

export default SearchForm