const bitfinexResponseFormatter = (res:number[]|{message:string}) => {
    if(Array.isArray(res) && res.length > 6){
        return res[6]; 
    }else {
        return -404
    }
}

export default bitfinexResponseFormatter