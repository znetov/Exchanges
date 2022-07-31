import React, {useState,useMemo} from "react"
import Modal from "../Modal"
import {getBinanceExchanges,getBitfinexExchanges,getHuobiExchanges,getKrakenExchanges} from '../../services/exchanges'

type ResultsTableProps = { //TODO move to types
    data: {platform:string,price:number}[]
    pair: string
}

const ResultsTable = function(props:ResultsTableProps){
    const {data, pair} = props
    const [sortConfig, setSortConfig] = useState({direction:""});
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupData, setPopupData] = useState<any>({})

    let sortedData = [...data]
    React.useMemo(()=>{
        
        sortedData.sort((a,b)=>{
        if(a.price < b.price){
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if(a.price > b.price){
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
            return 0
        })
        return sortedData
    },[data,sortConfig])

    const buildClassName = () =>{
        if (!sortConfig) {
            return;
        }
        return sortConfig.direction ? sortConfig.direction : undefined;
    }
    
    const sort = () => {
        let direction = 'ascending';
        if (sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ direction });
    }

    const handlePriceButtonClick = (platform:"Binance"|"Bitfinex"|"Huobi"|"Kraken") =>{

        let queries = {
            "Binance":{"symbol": pair.toUpperCase(), "limit": "15"},
            "Bitfinex":{"limit":  "15"},
            "Huobi":{"symbol": pair.toLowerCase(),"size": "15"},
            "Kraken":{"pair": pair.toUpperCase()}
        }
        let paths = {
            "Binance":"/trades",
            "Bitfinex":`/v2/trades/t${pair.toUpperCase()}/hist`,
            "Huobi":"/history/trade",
            "Kraken":"/0/public/Trades" //returns last 1000 trades no limit
        }
        
        let query = queries[platform]
        let path = paths[platform]
        

        if(platform==="Binance"){ //TODO catch the case when failing
            getBinanceExchanges(path,query).then((res)=>{
                let identifier = {key:"Binance",data:res}
                setPopupData(identifier) ;
                setPopupVisible(true);
            })
        }else if(platform==="Bitfinex"){
            getBitfinexExchanges(path,query).then((res)=>{
                let identifier = {key:"Bitfinex",data:res}
                setPopupData(identifier) ;
                setPopupVisible(true);
            })
        }else if (platform==="Huobi"){
            getHuobiExchanges(path,query).then((res:any)=>{
                let data = []
                for( let item of res.data){
                    data.push(item.data[0])
                }
                let identifier = {key:"Huobi",data:data}
                setPopupData(identifier) ;
                setPopupVisible(true);
            })
        }else{
            getKrakenExchanges(path,query).then((res:any)=>{
                if(res.error.length === 0){
                    let last15 = res.result[Object.keys(res.result)[0]].slice(0,15)
                    let identifier = {key:"Kraken",data:last15}
                    setPopupData(identifier) ;
                    setPopupVisible(true);
                }else {
                    //todo show popup with error msg
                }
            })
        }
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th className={buildClassName()} onClick={()=> {sort()}}>Price</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedData.map((item, key)=> {
                            return (
                                <tr key={key}>
                                    <td>{item.platform}</td>
                                    <td><button id={item.platform} onClick={(e)=>{
                                        //@ts-ignore
                                        handlePriceButtonClick(e.currentTarget.id)
                                    }}>{item.price === -404 ? "Invalid Symbol": item.price}</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Modal popupData={popupData} title={"Details"} onClose={() => {
              setPopupVisible(false)
            }} visible={popupVisible}/>
        </>
    )
}

export default ResultsTable