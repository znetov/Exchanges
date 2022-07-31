type binanceResponseFormat = {
    symbol?: string
    price?: string
    code?: number
    msg?: string
}

const binanceResponceFormatter = (res:binanceResponseFormat) => {
    if(res.price){
        return  Number(res.price);
    }else {
       return   -404;
    }
}

export default binanceResponceFormatter