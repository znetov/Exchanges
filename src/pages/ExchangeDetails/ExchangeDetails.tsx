import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { getBitfinexExchanges } from "../../services/exchanges"
import Modal from "../../components/Modal"

const ExchangeDetails = () => {
    const [visible, setVisible] = useState(false)
    const [data,setData] = useState<any>({key: "", data: []})
    const params = useParams()
    const pair = params.pair || ""

    useEffect(()=> {
        getBitfinexExchanges(`/v2/trades/t${pair.toUpperCase()}/hist`,{ "limit": "15"}).then((res)=>{ //TODO maybe call all 4 platforms as there is no requirements 
            let identifier = {key:"Bitfinex",data:res}
            setData(identifier) ;
            setVisible(true);
        })
    },[])
    return (
        <>
            <Modal  visible={visible} onClose={()=> {setVisible(false)}} title="Details" popupData={data}/>
        </>
    )
}

export default ExchangeDetails