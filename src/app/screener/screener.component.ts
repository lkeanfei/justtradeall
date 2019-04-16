import { Component, OnInit } from '@angular/core';
import construct = Reflect.construct;
import {HttpService} from "../shared/httpservice.service";
import {Screener} from "../shared/Screener";


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
  }

  screenStocks() {
    console.log(this.screener);
    let startTime = new Date();
    this.httpService.getScreenerResults(this.screener).subscribe( res=> {
      let endTime = new Date();
      let timeDiff = endTime.getTime() - startTime.getTime();
      console.log('time diff ' + timeDiff);
    });
  }

  ntaChange() {
    this.screener.nta = this.nta;
    this.screenStocks();
  }

  dividendYieldChange() {
    this.screener.dividendyield = this.dividendYield;
    this.screenStocks();
  }

  dividendChange() {
    this.screener.dividend = this.dividend;
    this.screenStocks();
  }

  roeRatioChange() {
    this.screener.roeratio = this.roeRatio;
    this.screenStocks();
  }

  peRatioChange() {

    this.screener.peratio = this.peRatio;
    this.screenStocks();
  }

  sharesChange() {
    console.log("Shares change "+ this.shares);
    this.screener.shares = this.shares;
  }

  marketCapChange() {

    this.screener.marketcap = this.marketCap;
    this.screenStocks();
  }

  epsChange() {

    this.screener.eps = this.epsValue;
    this.screenStocks();
  }

}
