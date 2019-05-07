import {Component, OnInit, QueryList, ViewChild} from '@angular/core';
import construct = Reflect.construct;
import {HttpService} from "../shared/httpservice.service";
import {Screener} from "../shared/Screener";
import {MatPaginator, MatTableDataSource, Sort} from "@angular/material";

export interface TechnicalsRow {
  name: string;
  symbol: string;
  Close: number;
  Volume: number;
  SMA20 : number;
  SMA50 : number;
  RSI : number;
  ATR14 : number;
  VolumeChangePct :number;
}

export interface FundamentalRow {
  name: string;
  symbol: string;
  MarketCap: number;
  NumShares: number;
  EPS: number;
  PERatio: number;
  ROERatio : number;
  Dividend : number;
  DividendYield : number;
  NTA : number;
  ParValue: number
}

@Component({
  selector: 'app-screener',
  templateUrl: './screener.component.html',
  styleUrls: ['./screener.component.css']
})
export class ScreenerComponent implements OnInit {

  // Fundamentals

  epsValue = 'Any';
  marketCap = 'Any'
  shares = 'Any';
  peRatio = 'Any';
  roeRatio = 'Any';
  dividend = 'Any';
  dividendYield = 'Any';
  nta = 'Any';
  parValue  = 'Any';
  epsRange = [ 'Any', '>100' , '>50' , '>20' , '>0' , '>-10', '<100', '<50' , '<20' , '<0' , '<-10'];
  marketCapRange = [ 'Any', '>10b' , '>5b' , '>2b' , '>1b' , '>500m' , '<10b' , '<5b' , '<2b' , '<1b' , '<500m'];
  sharesRange = ['Any','>500m' , '>200m' , '>100m' , '>50m' , '<500m' , '<200m' , '<100m' , '<50m' ];
  peRatioRange = [ 'Any',  '>500' , '>200' , '>100' , '>50' ,   '<500' , '<200' , '<100' , '<50' , '<20' ];
  roeRatioRange = ['Any','>50' , '>20' , '>10' , '>0' , '>-10' , '<50' , '<20' , '<10' , '<0' , '<-10'];
  dividendRange = [ 'Any','>50' , '>20' , '>10' , '>5' , '>1' , '<50' , '<20' , '<10' , '<5' , '<1'];
  dividendYieldRange = [ 'Any','>50' , '>20' , '>10' , '>5' , '<50' , '<20' , '<10' , '<5' ];
  ntaRange = [ 'Any', '>10' , '>5' , '>2' , '>1' , '<10' , '<5' , '<2' , '<1' ];
  screener : Screener;

  fundamentalsDataSource = new MatTableDataSource();
  fundamentalColumns = ['symbol' , 'MarketCap' , 'NumShares' , 'EPS' , 'PERatio' , 'ROERatio', 'Dividend' , 'DividendYield' , 'NTA' , 'ParValue'];

  symbolWidth = 10;
  marketCapWidth = 10;
  NumSharesWidth = 10;
  EPSWidth = 10;
  PERatioWidth = 10;
  ROERatioWidth = 10;
  DividendWidth = 10;
  DividendYieldWidth = 10;
  NTAWidth = 10;
  ParValueWidth = 10;

  technicalsDataSource = new MatTableDataSource<TechnicalsRow>();
  technicalColumns = ['symbol' , 'Close' , 'Volume' , 'VolumeChangePct' , 'SMA20' , 'SMA50' , 'RSI', 'ATR14' ];

  technicalSymbolWidth = 20;
  closeWidth = 10;
  volumeWidth = 15;
  volumeChangeWidth = 15;
  sma20Width = 10;
  sma50Width = 10;
  rsiWidth = 10;
  atrWidth = 10;





  isLoading = true;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  // Technicals
  priceValue = 'Any';
  volumeValue = 'Any';
  unusualVolumeValue = 'Any';
  sma20Value = 'Any';
  sma50Value = 'Any';
  sma200Value = 'Any';
  rsiValue = 'Any';
  gapValue = 'Any';
  atrValue = 'Any';
  vwapValue = 'Any'

  priceRange = ['Any' , '>10' , '>5' , '>2' , '>1' , '>0.5' , '<10' , '<5' , '<2' , '<1' , '<0.5'];
  volumeRange = ['Any' , '>20m' , '>10m' , '>5m' , '>2m' , '>1m' , '>500k' , '<20m' , '<10m' , '<5m' , '<2m' , '<1m' , '<500k'];
  unusualVolumeRange = ['Any' , '>10%' , '>20%' , '>50%' , '>100%' ];
  sma20Range = ['Any' , 'Price above SMA20' , '10% above SMA20' ,'20% above SMA20' , '30% above SMA20' , 'Price below SMA20' ,'10% below SMA20' ,'20% below SMA20' , '30% below SMA20'  ];
  sma50Range = ['Any' , 'Price above SMA50' , '10% above SMA50' ,'20% above SMA50' , '30% above SMA50' , 'Price below SMA50' ,'10% below SMA50' ,'20% below SMA50' , '30% below SMA50' ];
  rsiRange = ['Any' , 'Overbought (90)','Overbought (80)', 'Overbought (70)', 'Overbought (60)' , 'Oversold (40)' , 'Oversold (30)' ,'Oversold (20)' ,'Oversold (10)'];
  gapRange = ['Any' , 'Gap Up' , 'Gap Down'];
  atrRange = ['Any' , '>0.5' , '>0.2' , '>0.1' , '>0.05' , '<0.5' ,'<0.2' , '<0.1' , '<0.05'];
  vwapRange = ['Any'];


  @ViewChild('fundPaginator') fundamentalsPaginator: MatPaginator;
  @ViewChild('techPaginator') technicalsPaginator: MatPaginator;

  constructor(private  httpService : HttpService) {
    this.screener = {
      eps: this.epsValue,
      marketcap:  this.marketCap,
      shares:  this.shares,
      peratio: this.peRatio,
      roeratio: this.roeRatio,
      dividend:  this.dividend,
      dividendyield: this.dividendYield,
      nta: this.nta,
      parvalue: this.parValue,
      price: this.priceValue,
      volume: this.volumeValue,
      unusualVolume: this.unusualVolumeValue,
      sma20: this.sma20Value,
      sma50: this.sma50Value,
      rsi: this.rsiValue,
      gap: this.gapValue,
      atr: this.atrValue,
      vwap: this.vwapValue,
    };

  }

  ngOnInit() {
    this.fundamentalsDataSource.paginator = this.fundamentalsPaginator;
    this.technicalsDataSource.paginator = this.technicalsPaginator;
    this.screenStocks();


  }

  screenStocks() {
    console.log(this.screener);
    let startTime = new Date();
    this.isLoading = true;
    this.httpService.getScreenerResults(this.screener).subscribe( res=> {
      let endTime = new Date();
      let timeDiff = endTime.getTime() - startTime.getTime();

      this.fundamentalsDataSource.data = res['fundamentals'];
      this.technicalsDataSource.data = res['technicals']

      setTimeout(() => {
        this.fundamentalsDataSource.paginator = this.fundamentalsPaginator;
        this.technicalsDataSource.paginator = this.technicalsPaginator;
      },2000);

      this.isLoading = false;
      console.log('time diff ' + timeDiff);
    });
  }

  sortTechnicalsData(sort: Sort) {

    let column = sort.active;

    function compare(a,b)  {

      let val = -1;
      if(sort.direction == 'desc')
      {
        val = 1;
      }

      if (a[column] < b[column])
        return val;
      if (a[column] > b[column])
        return val*(-1);
      return 0;
    }

    let arr =  this.technicalsDataSource.data;

    arr.sort(compare);

    this.technicalsDataSource.data = arr;
  }

  sortData(sort: Sort) {

    let column = sort.active;

    function compare(a,b)  {

      let val = -1;
      if(sort.direction == 'desc')
      {
        val = 1;
      }

      if (a[column] < b[column])
        return val;
      if (a[column] > b[column])
        return val*(-1);
      return 0;
    }

    let arr =  this.fundamentalsDataSource.data;

    arr.sort(compare);

    this.fundamentalsDataSource.data = arr;
  }

  ntaChange() {
    this.screener.nta = this.nta;
   // this.screenStocks();
  }

  dividendYieldChange() {
    this.screener.dividendyield = this.dividendYield;
   // this.screenStocks();
  }

  dividendChange() {
    this.screener.dividend = this.dividend;
   // this.screenStocks();
  }

  roeRatioChange() {
    this.screener.roeratio = this.roeRatio;
  //  this.screenStocks();
  }

  peRatioChange() {

    this.screener.peratio = this.peRatio;
    //this.screenStocks();
  }

  sharesChange() {
   // console.log("Shares change "+ this.shares);
    this.screener.shares = this.shares;
  }

  marketCapChange() {

    this.screener.marketcap = this.marketCap;
  //  this.screenStocks();
  }

  epsChange() {

    this.screener.eps = this.epsValue;
  //  this.screenStocks();
  }



  //
  //  Technicals
  //
  //
  priceChange() {
    this.screener.price = this.priceValue;
  }

  volumeChange() {
    this.screener.volume = this.volumeValue;
  }

  unusualVolumeChange() {
    this.screener.unusualVolume = this.unusualVolumeValue;
  }

  sma20Change()
  {
    this.screener.sma20 = this.sma20Value;
  }

  sma50Change() {
    this.screener.sma50 = this.sma50Value;
  }


  rsiChange() {
    this.screener.rsi = this.rsiValue;
  }

  gapChange(){
    this.screener.gap = this.gapValue;
  }

  atrChange() {
    this.screener.atr = this.atrValue;
  }

  vwapChange() {
    this.screener.vwap = this.vwapValue
  }




}
