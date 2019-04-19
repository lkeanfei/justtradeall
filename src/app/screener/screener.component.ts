import { Component, OnInit } from '@angular/core';
import construct = Reflect.construct;
import {HttpService} from "../shared/httpservice.service";
import {Screener} from "../shared/Screener";
import {MatTableDataSource, Sort} from "@angular/material";

export interface FundamentalRow {
  name: string;
  symbol: string;
  MarketCap: Date;
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

  isLoading = true;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;



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
      parvalue: this.parValue
    };

  }

  ngOnInit() {

    this.screenStocks();


  }

  screenStocks() {
    console.log(this.screener);
    let startTime = new Date();
    this.isLoading = true;
    this.httpService.getScreenerResults(this.screener).subscribe( res=> {
      let endTime = new Date();
      let timeDiff = endTime.getTime() - startTime.getTime();

      this.fundamentalsDataSource.data = res['results'];
      this.isLoading = false;
      console.log('time diff ' + timeDiff);
    });
  }

  sortData(sort: Sort) {

    let column = sort.active;
    // console.log(sort.active);
    // console.log('Direction ' + sort.direction );



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

    /*
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'calories': return compare(a.calories, b.calories, isAsc);
        case 'fat': return compare(a.fat, b.fat, isAsc);
        case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });

    */
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

}
