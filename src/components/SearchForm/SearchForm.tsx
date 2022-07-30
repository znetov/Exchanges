import React, { BaseSyntheticEvent, useState } from "react"
import { getBinanceExchanges, getBitfinexExchanges, getHuobiExchanges, getKrakenExchanges } from "../../services/exchanges"
import ResultsTable from "../ResultsTable"
import binanceResponceFormatter from "../../utils/binanceResponseFormater"
import huobiResponseFormater from "../../utils/huobiResponseFormatter"

type searchFormProps = {
    initialValue?: string
}

const SearchForm = function(props: searchFormProps){
    const {initialValue} = props
    const [tableData, setTableData] = useState<{ platform: string; price: string; }[]>([])

    const handleSubmit = (e:BaseSyntheticEvent) => {
        e.preventDefault()
        setTableData([])
        let value:string = e.target.children[0].value
        value = value.replace("/", "")
        let queryParamBinance = {"symbol": value.toUpperCase()}
        let queryParamHuobi = {"symbol": value.toLowerCase()}
        let queryParamBitfinex = {"symbol": "t" + value}
        let queryParamKraken = {"pair":  value}
        getBinanceExchanges("/ticker/price",queryParamBinance ).then((res:any) => { //change to proper response format
            let formated = binanceResponceFormatter(res)
            let combined = [...tableData, formated]
            setTableData(combined)
        }).catch((er)=>{
            debugger
        })
        // getBitfinexExchanges("/ticker", queryParamBitfinex ).then((res:any) => { //change to proper response format
        //     debugger
        // }).catch((er)=>{
        //     debugger
        // })
        getHuobiExchanges("/trade", queryParamHuobi).then((res:any)=>{ //todo change to proper response format
           if(res.status === 'ok'){
                let formated = huobiResponseFormater(res)
                let combined = [...tableData, formated]
                setTableData(combined)
           }
        }).catch((er)=>{
            debugger
        })
        // getKrakenExchanges("/ticker", queryParamKraken).then((res:any)=>{
        //     debugger
        // }).catch((er)=>{
        //     debugger
        // })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={initialValue}
                />
                <button type="submit"></button>
            </form>
            <div id="apiTest"></div>
            <ResultsTable data={tableData}/>
        </>        
    )
}

export default SearchForm