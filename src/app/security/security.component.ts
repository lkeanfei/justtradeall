import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from "../shared/httpservice.service";
import * as Highcharts from 'highcharts/highstock';
import * as HC_indic from 'highcharts/indicators/indicators';
import * as HC_BB from 'highcharts/indicators/bollinger-bands';
import * as HC_RSI from 'highcharts/indicators/rsi';
HC_indic(Highcharts); // loads core and enables sma
HC_BB(Highcharts);
HC_RSI(Highcharts);

import {concatMap, map, switchMap, take, tap} from 'rxjs/operators';
import {MatTableDataSource} from "@angular/material";
import {LoginService} from "../shared/loginservice.service";
import {Observable, of} from "rxjs/index";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  private sub: any;
  fullid: string;
  showStatic = true;
  showLogin = true;
  fxFlexValue = 75;

  dailyData = [];
  chartWidth: number;

  staticUpdateFlag = false; // optional boolean
  staticOneToOneFlag = false; // optional boolean, defaults to false
  staticChartOptions : any;

  interactiveUpdateFlag = false;
  interactiveOneToOneFlag = false;
  interactiveChartOptions : any;

  securitySummaryDataSource =  new MatTableDataSource<any>();
  securitySummaryColumns: string[] = ['label' , 'value'];
  Highstocks = Highcharts;
  tableMap = {};
  data = [
    [
      1468243800000,
      96.75,
      97.65,
      96.73,
      96.98
    ],
    [
      1468330200000,
      97.17,
      97.7,
      97.12,
      97.42
    ],
    [
      1468416600000,
      97.41,
      97.67,
      96.84,
      96.87
    ],
    [
      1468503000000,
      97.39,
      98.99,
      97.32,
      98.79
    ],
    [
      1468589400000,
      98.92,
      99.3,
      98.5,
      98.78
    ],
    [
      1468848600000,
      98.7,
      100.13,
      98.6,
      99.83
    ],
    [
      1468935000000,
      99.56,
      100,
      99.34,
      99.87
    ],
    [
      1469021400000,
      100,
      100.46,
      99.74,
      99.96
    ],
    [
      1469107800000,
      99.83,
      101,
      99.13,
      99.43
    ],
    [
      1469194200000,
      99.26,
      99.3,
      98.31,
      98.66
    ],
    [
      1469453400000,
      98.25,
      98.84,
      96.92,
      97.34
    ],
    [
      1469539800000,
      96.82,
      97.97,
      96.42,
      96.67
    ],
    [
      1469626200000,
      104.27,
      104.35,
      102.75,
      102.95
    ],
    [
      1469712600000,
      102.83,
      104.45,
      102.82,
      104.34
    ],
    [
      1469799000000,
      104.19,
      104.55,
      103.68,
      104.21
    ],
    [
      1470058200000,
      104.41,
      106.15,
      104.41,
      106.05
    ],
    [
      1470144600000,
      106.05,
      106.07,
      104,
      104.48
    ],
    [
      1470231000000,
      104.81,
      105.84,
      104.77,
      105.79
    ],
    [
      1470317400000,
      105.58,
      106,
      105.28,
      105.87
    ],
    [
      1470403800000,
      106.27,
      107.65,
      106.18,
      107.48
    ],
    [
      1470663000000,
      107.52,
      108.37,
      107.16,
      108.37
    ],
    [
      1470749400000,
      108.23,
      108.94,
      108.01,
      108.81
    ],
    [
      1470835800000,
      108.71,
      108.9,
      107.76,
      108
    ],
    [
      1470922200000,
      108.52,
      108.93,
      107.85,
      107.93
    ],
    [
      1471008600000,
      107.78,
      108.44,
      107.78,
      108.18
    ],
    [
      1471267800000,
      108.14,
      109.54,
      108.08,
      109.48
    ],
    [
      1471354200000,
      109.63,
      110.23,
      109.21,
      109.38
    ],
    [
      1471440600000,
      109.1,
      109.37,
      108.34,
      109.22
    ],
    [
      1471527000000,
      109.23,
      109.6,
      109.02,
      109.08
    ],
    [
      1471613400000,
      108.77,
      109.69,
      108.36,
      109.36
    ],
    [
      1471872600000,
      108.86,
      109.1,
      107.85,
      108.51
    ]];


  chartConstructor = 'stockChart'; // optional string, defaults to 'chart'


  constructor(private route: ActivatedRoute , private httpService: HttpService , private loginService: LoginService) {
    // const httpSub = this.httpService.getSecurityView('12345').pipe(
    //   map(prms => prms['fullid'])
    // );

    const dateStr = '2018-08-21'
    this.tableMap['rsi'] = 'RSI';
    this.tableMap['wkhigh52'] = '52-week High';
    this.tableMap['wklow52'] = '52-week Low';
    this.tableMap['averagevol'] = 'Average Volume'

    const chartWidth = window.screen.width * 0.60;

    this.staticChartOptions = {
      chart : {
        width : chartWidth
      },
      navigator: {
        enabled: false
      },
      tooltip : {
        animation: false,
        crosshairs: false,
        enabled: false
      },
      scrollbar : {
        enabled: false
      },
      rangeSelector: {
        enabled: false,
        inputEnabled: false,
        buttonTheme: {
          visibility: 'hidden'
        },
        labelStyle: {
          visibility: 'hidden'
        }
      },
      series: [{
        type : 'candlestick',
        states: {
          hover: {
            enabled: false
          }
        },
        data: []
      }],
      yAxis: {
        crosshair: true,
        tickPixelInterval: 10,
      },
      xAxis: {
        crosshair: true,
        events: {
          setExtremes:(evt) => {
            let minDate = new Date(evt.min);
            console.log('x axis ' + minDate + ' ' + evt.max);
          }},
      }
    };

    this.interactiveChartOptions  = {
      chart : {
        width : chartWidth
      },

      series: [{
        type : 'candlestick',
        id : 'candlestick',
        data: []
      }
        ,{
          type: 'column',
          name: 'Volume',
          data: [],
          yAxis: 1,
        }
        , {
          type: 'bb',
          linkedTo: 'candlestick'
        }
        , {
          yAxis: 2,
          type: 'rsi',
          linkedTo: 'candlestick'
        }],
      yAxis:[{
        crosshair: true,
        height: '50%',
        tickPixelInterval: 10,
      },
        {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Volume'
          },
          top: '50%',
          height: '25%',
          offset: 0,
          lineWidth: 2
        },
        {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'RSI'
          },
          top: '75%',
          height: '25%',
          offset: 0,
          lineWidth: 2
        }],
      xAxis: {
        crosshair: true,
        events: {
          setExtremes:(evt) => {
            let minDate = new Date(evt.min);
            console.log('x axis ' + minDate + ' ' + evt.max);
          }},
      }
    };


    console.log('Constructing security!!')


    const theSub = this.route.params.pipe(
      concatMap(prms => { return this.httpService.getSecurityView(prms['fullid'], dateStr) })
    );

    theSub.subscribe( res => {

      const dataList = []
      const keys = Object.keys(res['summary']);

      for (const key of keys) {
        const value = res['summary'][key];
        // console.log('key and value ' + value + ". " + key)
        dataList.push({ 'label' : this.tableMap[key] , 'value' : value})
        this.securitySummaryDataSource.data = dataList;


      }

      this.dailyData = res['daily'];

      this.staticChartOptions['series'][0]['data'] = this.dailyData;
      this.interactiveChartOptions['series'][0]['data'] = this.dailyData;
      this.interactiveChartOptions['series'][1]['data'] = res['volume']

      this.staticUpdateFlag = true;
      this.interactiveUpdateFlag = true;
      this.Highstocks.charts[0].redraw();

    });


  }

  ngOnInit() {

    const chartWidth = window.screen.width * 0.60;
    this.staticChartOptions['series'][0]['data'] = this.dailyData
    this.interactiveChartOptions['series'][0]['data'] = this.dailyData
    this.staticUpdateFlag = true;
    this.interactiveUpdateFlag = true;
    this.Highstocks.charts[0].redraw();

  }

  switchToStatic() {
    this.showStatic = true;
    this.fxFlexValue = 75;
    this.ngOnInit();
  }

  switchToInteractive() {

    const id = localStorage.getItem('id');
    console.log('id is ' + id);
    this.showStatic = false;
    this.showLogin = true;
    // if (id === null) {
    //   this.showLogin = true;
    // }
    this.fxFlexValue = 75;
    console.log('To Interactive');
    this.ngOnInit();
  }

  openDialog() {
    this.loginService.openDialog()
  }

  ngOnDestroy() {

  }

}
