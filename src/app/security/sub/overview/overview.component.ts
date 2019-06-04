import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as HC_indic from 'highcharts/indicators/indicators';
import * as HC_BB from 'highcharts/indicators/bollinger-bands';
import * as HC_RSI from 'highcharts/indicators/rsi';
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs/index";
import {HttpService} from "../../../shared/httpservice.service";
import {concatMap } from 'rxjs/operators';
import {MatTableDataSource} from "@angular/material";
import {DataService} from "../../data.service";
import {LayoutServiceService} from "../../../shared/layout-service.service";
HC_indic(Highcharts); // loads core and enables sma
HC_BB(Highcharts);
HC_RSI(Highcharts);

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {


  Highstocks = Highcharts;
  chartConstructor = 'stockChart'; // optional string, defaults to 'chart'
  staticUpdateFlag = false; // optional boolean
  staticOneToOneFlag = false; // optional boolean, defaults to false
  staticChartOptions : any;
  startLoading = true;
  staticBoxExists : boolean;
  staticBoxFromDate: string;
  staticBoxToDate: string;
  staticBoxHigh: number;
  staticBoxLow: number;

  isLoading = true;
  isHandset = false;

  fundamentalsDataSource =  new MatTableDataSource<any>();
  fundamentalsColumns: string[] = ['key' , 'value'];
  technicalsDataSource =  new MatTableDataSource<any>();
  technicalsColumns: string[] = ['key' , 'value'];

  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  dailyData = [];
  tableMap = {};
  securitySummaryDataSource =  new MatTableDataSource<any>();
  securitySummaryColumns: string[] = ['label' , 'value'];

  MarketCap: number;
  Shares : number;
  FloatingShares: number;
  FloatingSharesPCT: number;
  EPS : number;
  PERatio : number;
  ROERatio : number;
  Dividend : number;
  DividendYield : number;
  NTA : number;
  PARValue: number;

  constructor(private route: ActivatedRoute , private httpService: HttpService ,
              private layoutService: LayoutServiceService,
              private dataService: DataService ) {

    this.tableMap['rsi'] = 'RSI';
    this.tableMap['wkhigh52'] = '52-week High';
    this.tableMap['wklow52'] = '52-week Low';
    this.tableMap['averagevol'] = 'Average Volume';



    const chartWidth = window.screen.width * 0.75;
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
      yAxis: [{
        crosshair: true,
        tickPixelInterval: 10,
      }],
      xAxis: [{

        crosshair: true,
        events: {
          setExtremes:(evt) => {
            let minDate = new Date(evt.min);
            //console.log('x axis ' + minDate + ' ' + evt.max);
          }},
      }]
    };

    // const theSub = this.route.params.pipe(
    //   // concatMap(prms => { return this.httpService.getSecurityView(prms['fullid'], dateStr) })
    //   concatMap( prms => this.routeChangedDetected(prms))
    // );

    this.dataService.overviewDictData$.subscribe(data => {
      this.MarketCap = data["MarketCap"]
      this.Shares = data["Shares"]
      this.FloatingShares = data["FloatingShares"]
      this.FloatingSharesPCT = data["FloatingSharesPCT"]
      this.EPS= data["EPS"]
      this.PERatio= data["PERatio"]
      this.ROERatio = data["ROERatio"]
      this.Dividend = data["Dividend"]
      this.DividendYield = data["DividendYield"]
      this.NTA = data["NTA"]
      this.PARValue = data["PARValue"]
    });

    this.dataService.technicalsData$.subscribe( data => {
       this.technicalsDataSource.data = data;
    });

    this.dataService.fundamentalsData$.subscribe( data => {
       this.fundamentalsDataSource.data = data;
    });


    // theSub.subscribe( res => {
    //
    //   const dataList = [];
    //   let status =  res['status'];
    //   // const keys = Object.keys(res['summary']);
    //   this.startLoading = false;
    //
    //
    //   // for (const key of keys) {
    //   //   const value = res['summary'][key];
    //   //   // console.log('key and value ' + value + ". " + key)
    //   //   dataList.push({ 'label' : this.tableMap[key] , 'value' : value})
    //   //   this.securitySummaryDataSource.data = dataList;
    //   // }
    //
    //   this.dailyData = res['daily'];
    //   this.staticChartOptions['series'][0]['data'] = this.dailyData;
    //
    //   if( Object.keys(res['staticbox']).length === 0) {
    //     this.staticBoxExists = false;
    //   }
    //   else {
    //     this.staticBoxExists = true;
    //     this.staticBoxFromDate = res['staticbox']['fromdate'];
    //     this.staticBoxToDate = res['staticbox']['todate'];
    //     this.staticBoxHigh = res['staticbox']['highesthigh'];
    //     this.staticBoxLow = res['staticbox']['lowestlow'];
    //
    //
    //
    //     let staticBoxPlotBand = {
    //       color: '#FCFFC5',
    //       from: this.staticBoxLow,
    //       to: this.staticBoxHigh
    //     };
    //
    //      let lowestLowPlotLine = {
    //        color: '#FF0000',
    //        width: 2,
    //        value: res['staticbox']['todatems']
    //      }
    //
    //      this.staticChartOptions['yAxis'][0]['plotBands'] = []
    //     this.staticChartOptions['yAxis'][0]['plotBands'].push(staticBoxPlotBand)
    //
    //     this.staticChartOptions['xAxis'][0]['plotLines'] = []
    //     this.staticChartOptions['xAxis'][0]['plotLines'].push(lowestLowPlotLine)
    //     // this.staticChartOptions['xAxis'][0]['plotBands'][0]['from'] =  res['staticbox']['fromdatems']
    //     // this.staticChartOptions['xAxis'][0]['plotBands'][0]['from'] =  res['staticbox']['todatems']
    //     // console.log(this.staticChartOptions['xAxis'][0]['plotBands'][0])
    //
    //     // console.log(this.staticChartOptions['xAxis'])
    //     // console.log(this.staticChartOptions['xAxis'].get('plotBands'))
    //    // this.staticChartOptions['xAxis'][0]['plotBands'] = [ staticBoxPlotBand ];
    //
    //   }
    //
    //
    //
    //   this.staticUpdateFlag = true;
    //   this.isLoading = false;
    //
    //
    //   // Temporary disable
    //   // this.Highstocks.charts[0].redraw();
    //
    //
    // });



  }
  ngOnInit() {
      this.layoutService.getIsHandSetObservable().subscribe(val => {
          this.isHandset = val;
      });

  }

  // routeChangedDetected( prms) : Observable<any> {
  //   // const dateStr = '2018-08-21';
  //   // this.startLoading = true;
  //   return this.httpService.getSecurityView(prms['fullid'])
  // }

}
