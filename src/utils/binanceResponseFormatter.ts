type binanceResponseFormat = {
    symbol?: string
    price?: string
    code?: number
    msg?: string
}

const binanceResponceFormatter = (res:binanceResponseFormat) => {
    if(res.price){
        return {"platform": "Binance", "price": Number(res.price) };
    }else {
       return {"platform": "Binance", "price":  -404};
    }
}

export default binanceResponceFormatter