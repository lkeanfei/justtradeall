
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

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

    getSecurityView(fullid: string ,dateStr: string) {
      const body = { 'fullid' : fullid , 'date' : dateStr };
      return this.httpClient.post( '/api/security/' , body );
    }

    getAllCounters() {
      const body = { };
      return this.httpClient.post( '/api/counters/' , body );
    }

    getFrontPageView() {

      const body = { 'name' : 'test' };
      return this.httpClient.post( '/api/frontpage/' , body );
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




}
