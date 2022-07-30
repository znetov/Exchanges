import { fetchJson } from "./common";

//const binanceURL = "/binanceTicker"
const binanceURL = "https://api.binance.com/api/v3"
const bitfinexURL = "https://api-pub.bitfinex.com/v2"
const huobiURL = "https://api.huobi.pro/market"
const krakenURL = "https://api.kraken.com/0/public"

export const getBinanceExchanges = (path:string, queryParams: {[key:string]: string})  => 
    fetchJson(`${binanceURL}${path}`, queryParams);

export const getBinanceRecentTrades = (path:string, queryParams: {[key:string]: string})  => 
    fetchJson(`${binanceURL}${path}`, queryParams);

export const getBitfinexExchanges = (path:string, queryParams: {[key:string]: string})  => 
    fetchJson(`${bitfinexURL}${path}`, queryParams);

export const getHuobiExchanges = (path:string, queryParams: {[key:string]: string})  => 
    fetchJson(`${huobiURL}${path}`, queryParams);

export const getHuobiRecentTrades = (path:string, queryParams: {[key:string]: string})  => 
    fetchJson(`${binanceURL}${path}`, queryParams);

export const getKrakenExchanges = (path:string, queryParams: {[key:string]: string})  =>
    fetchJson(`${krakenURL}${path}`, queryParams);
