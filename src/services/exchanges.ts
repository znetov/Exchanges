import { fetchJson } from "./common";

//const binanceURL = "/binanceTicker"
const binanceURL = "https://api.binance.com/api/v3"
const bitfinexURL = "/bitfinex"
const huobiURL = "https://api.huobi.pro/market"
const krakenURL = "/kraken"

export const getBinanceExchanges = (path:string, queryParams: {[key:string]: string})  => 
    fetchJson(`${binanceURL}${path}`, queryParams);

export const getBitfinexExchanges = (path:string, queryParams: {[key:string]: string})  => 
    fetchJson(`${bitfinexURL}${path}`, queryParams);

export const getHuobiExchanges = (path:string, queryParams: {[key:string]: string})  => 
    fetchJson(`${huobiURL}${path}`, queryParams);

export const getKrakenExchanges = (path:string, queryParams: {[key:string]: string})  =>
    fetchJson(`${krakenURL}${path}`, queryParams);
