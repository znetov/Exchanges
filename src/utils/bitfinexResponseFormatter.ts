const bitfinexResponseFormatter = (res:number[]|{message:string}) => {
    if(Array.isArray(res) && res.length > 6){
        return {"platform": "Bitfinex", "price": res[6] }
    }else {
        return {"platform": "Bitfinex", "price":  -404} 
    }
}

export default bitfinexResponseFormatter