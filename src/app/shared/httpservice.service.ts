
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {from, Observable} from "rxjs/index";
import { Screener} from './Screener';

interface PriceRequestInput {
  id: string,
  fromDate: string,
  toDate: string,
  intra: boolean
}

@Injectable()
export class HttpService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    constructor(private httpClient:HttpClient) {}


    get(url: string ) {
        return this.httpClient.get(url);
    }

    post(url: string , body: any ) {
        return this.httpClient.post( url , body , this.httpOptions);
    }

    verifySession() {
      const data = {};
      return this.httpClient.post('/api/sessionverify/' , data);
    }

    logout() {
      const data = {};
      return this.httpClient.post( '/api/sessionlogout/' , data);
    }

    postIdToSessionLogin(idToken: string) {
      const name = 'csrfToken';
      const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      const csrfToken = v ? v[2] : null;

      const data = {idToken: idToken, csrfToken: csrfToken}
      return this.httpClient.post( '/api/sessionlogin/' , data )
    }

    getLatestMarketOverview(dateStr : string , sector:string)
    {
      const body = { 'date' : dateStr , 'sector' : sector };
      return this.httpClient.post( '/api/latestmarketoverview/' , body );
    }

    getOwnershipShares(fromDateStr: string , toDateStr: string , name: string) {
       const body = { 'fromdate' : fromDateStr , 'todate' : toDateStr , 'name' : name};
       return this.httpClient.post('/api/ownershareholdings/', body);
    }

    getCompanyShares(fromDateStr: string , toDateStr: string)  {
      const body = { 'fromdate' : fromDateStr , 'todate' : toDateStr};
      return this.httpClient.post('/api/companyshares/' , body);
    }


    getScreenerResults( screener: Screener)
    {
       const body = { 'eps' : screener.eps , 'marketcap' : screener.marketcap ,
                      'shares' : screener.shares , 'peratio' : screener.peratio,
                      'roeratio' : screener.roeratio , 'dividend' : screener.dividend,
                      'dividendyield' : screener.dividendyield , 'nta' : screener.nta,
                      'parvalue' : screener.parvalue ,
                       'price' : screener.price , 'volume' : screener.volume ,
                       'unusualVolume' : screener.unusualVolume , 'sma20' : screener.sma20,
                       'sma50' : screener.sma50 , 'rsi' : screener.rsi,
                        'gap' : screener.gap , 'atr' : screener.atr , 'vwap' : screener.vwap

         }

      return this.httpClient.post( '/api/screener/' , body );
    }


    getMarketOverview(dateStr : string , sector:string)
    {
        console.log('trading date is ' + dateStr)
        const body = { 'date' : dateStr , 'sector' : sector };
        return this.httpClient.post( '/api/marketoverview/' , body );
    }

    getSecurityView(fullid: string ) : Observable<any> {
      const body = { 'fullid' : fullid  };
      return this.httpClient.post( '/api/security/' , body );
    }

    getCounterDetailView(fullid: string)  : Observable<any> {
      const body = { 'fullid' : fullid  };
      return this.httpClient.post( '/api/counterdetail/' , body );

    }

    getStaticBoxBreakout(fullid: string) : Observable<any> {
      const body = { 'fullid' : fullid  };
      return this.httpClient.post( '/api/staticboxbreakout/' , body );
    }

    getDynamicBoxBreakout(fullid: string) : Observable<any> {
      const body = { 'fullid' : fullid  };
      return this.httpClient.post( '/api/dynamicboxbreakout/' , body );
    }


    getHoldingsDistAndTop30View(fullid: string) {
      const body = { 'fullid' : fullid   };
      return this.httpClient.post( '/api/securityholdings/' , body );
    }

    getAllCounters() {
      const body = { };
      return this.httpClient.post( '/api/counters/' , body );
    }

    getFrontPageView() {

      const body = { 'name' : 'test' };
      return this.httpClient.post( '/api/frontpage/' , body );
    }

    getFrontPageNewHighLowView() {

      const body = {};
      return this.httpClient.post( '/api/frontpagenewhighlow/' , body );
    }

    getFrontPageTopGainers() {

      const body = {};
      return this.httpClient.post( '/api/frontpagetopgainers/' , body );
    }

    getFrontPageTopLosers() {

      const body = {};
      return this.httpClient.post( '/api/frontpagetoplosers/' , body );
    }

    getFrontPageVolume() {

      const body = {};
      return this.httpClient.post( '/api/frontpagevolume/' , body );
    }

    getFrontPageBreakout() {

      const body = {};
      return this.httpClient.post( '/api/frontpagebreakout/' , body );
    }

    getTradingDays() {
      const body = {};
      return this.httpClient.post('/api/tradingdays/' , body );
    }

    searchCompany( companyName : string) {

        const prm = new HttpParams();
        prm.set('name' , companyName);
        const body = { 'name' : companyName };
        return this.httpClient.post( '/api/company/' , body );
    }

    searchShareHolders( shareHolder: string) {
      const body = { 'shareholder' : shareHolder };
      return this.httpClient.post( '/api/company/' , body );

    }

    getPriceVolume( input: PriceRequestInput ) {
      const body = { 'id' : input.id,
      'from' : input.fromDate ,
      'to' : input.toDate,
      'intra' : input.intra };
      return this.httpClient.post( '/api/price/' , body );
    }

    getBursaPriceVolume() {

      const body = {};
      return this.httpClient.post( '/api/bursapricevol/' , body);

    }

    getFrontPage() {

      const body = {};
      return this.httpClient.post('/api/frontpage/' , body);

    }






}
