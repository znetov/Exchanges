import { fetchJson } from "./common";

const binanceURL = "/binance"
const bitfinexURL = "/bitfinex"
const huobiURL = "/huobi"
const krakenURL = "/kraken"

export const getBinanceExchanges = (path:string, queryParams: {[key:string]: string})  => 
    fetchJson(`${binanceURL}${path}`, queryParams);

export const getBitfinexExchanges = (path:string, queryParams: {[key:string]: string})  => 
    fetchJson(`${bitfinexURL}${path}`, queryParams);

export const getHuobiExchanges = (path:string, queryParams: {[key:string]: string})  => 
    fetchJson(`${huobiURL}${path}`, queryParams);

export const getKrakenExchanges = (path:string, queryParams: {[key:string]: string})  =>
    fetchJson(`${krakenURL}${path}`, queryParams);
