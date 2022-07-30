type binanceResponseFormat = {
    symbol?: string
    price?: string
    code?: number
    msg?: string
}

const binanceResponceFormatter = (res:binanceResponseFormat) => {
    if(res.price){
        return {"platform": "Binance", "price": res.price };
    }else if(res.msg) {
       return {"platform": "Binance", "price":  res.msg};
    }else {
      return  {"platform": "Binance", "price": "N/A"};
    }
}

export default binanceResponceFormatter