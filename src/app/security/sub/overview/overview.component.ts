import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as HC_indic from 'highcharts/indicators/indicators';
import * as HC_BB from 'highcharts/indicators/bollinger-bands';
import * as HC_RSI from 'highcharts/indicators/rsi';
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs/index";
import {HttpService} from "../../../shared/httpservice.service";
import {concatMap } from 'rxjs/operators';
import {MatTableDataSource} from "@angular/material";
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
  dailyData = [];
  tableMap = {};
  securitySummaryDataSource =  new MatTableDataSource<any>();
  securitySummaryColumns: string[] = ['label' , 'value'];

  constructor(private route: ActivatedRoute , private httpService: HttpService ) {

    this.tableMap['rsi'] = 'RSI';
    this.tableMap['wkhigh52'] = '52-week High';
    this.tableMap['wklow52'] = '52-week Low';
    this.tableMap['averagevol'] = 'Average Volume'

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

    const theSub = this.route.params.pipe(
      // concatMap(prms => { return this.httpService.getSecurityView(prms['fullid'], dateStr) })
      concatMap( prms => this.routeChangedDetected(prms))
    );


    theSub.subscribe( res => {

      const dataList = [];
      let status =  res['status'];
      console.log('Status is ' + status);

      const keys = Object.keys(res['summary']);
      this.startLoading = false;

      for (const key of keys) {
        const value = res['summary'][key];
        // console.log('key and value ' + value + ". " + key)
        dataList.push({ 'label' : this.tableMap[key] , 'value' : value})
        this.securitySummaryDataSource.data = dataList;
      }

      this.dailyData = res['daily'];
      this.staticChartOptions['series'][0]['data'] = this.dailyData;


      this.staticUpdateFlag = true;


      // Temporary disable
      // this.Highstocks.charts[0].redraw();


    });



  }
  ngOnInit() {
  }

  routeChangedDetected( prms) : Observable<any> {
    const dateStr = '2018-08-21';
    this.startLoading = true;
    return this.httpService.getSecurityView(prms['fullid'], dateStr)
  }

}
