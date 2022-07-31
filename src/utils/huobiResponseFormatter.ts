type huobiResponseFormat = {
    
    "ch": string,
    "status": string,
    "err-code"?: string,
    "err-msg"?: string,
    "ts": number,
    "tick": {
        "id": number,
        "ts": number,
        "data": 
            {
                "id": number,
                "ts": number,
                "trade-id": number,
                "amount": number,
                "price": number,
                "direction": string
            }[]
    }
    
}

const huobiResponseFormater = (res:huobiResponseFormat) => {
    if(res.status === "ok"){
        return {"platform": "Huobi", "price":  res.tick.data[0].price}
    }else {
        return {"platform": "Huobi", "price":  -404} 
    }
}

export default huobiResponseFormater