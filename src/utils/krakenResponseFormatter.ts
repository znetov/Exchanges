type krakenResponseFormat = {
    result: {
        [key:string]: {
            a:string[],
            b:string[],
            c:string[], //Last Trade closed - [price,volume]
            v:string[],
            p:string[],
            t:number[],
            l:string[],
            h:string[],
            o:string}}, //Todays opening price
    error: string[]
  }

const krakenResponseFormatter = (res:krakenResponseFormat) => {
    if(res.error.length === 0){
        let keys = Object.keys(res.result)
        return Number(res.result[keys[0]].c[0]) 
    }else {
        return -404
    }
}

export default krakenResponseFormatter