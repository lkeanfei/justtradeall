import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../../../shared/httpservice.service";
import {concatMap } from 'rxjs/operators';
import {User} from "../../../shared/security/user";
import {AuthService} from "../../../shared/security/auth.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/index";
import * as Highcharts from 'highcharts/highstock';
import * as HC_indic from 'highcharts/indicators/indicators';
import * as HC_BB from 'highcharts/indicators/bollinger-bands';
import * as HC_RSI from 'highcharts/indicators/rsi';
HC_indic(Highcharts); // loads core and enables sma
HC_BB(Highcharts);
HC_RSI(Highcharts);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  chartConstructor = 'stockChart';
  interactiveUpdateFlag = false;
  interactiveOneToOneFlag = false;
  interactiveChartOptions : any;
  showLogin = true;
  dailyData = [];
  Highstocks = Highcharts;

  staticBoxFromDate: string;
  staticBoxToDate: string;
  staticBoxHigh: string;
  staticBoxLow: string;

  isLoading = true;

  color = 'primary';
  mode = 'indeterminate';
  value = 50;



  constructor(private route: ActivatedRoute , private httpService: HttpService ,
              private authService: AuthService) {
    const chartWidth = window.screen.width * 0.75;
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
            //console.log('x axis ' + minDate + ' ' + evt.max);
          }},
      }
    };

    this.authService.getAuthReplayObservable().subscribe( (user: User) => {

      if( user == AuthService.UNKNOWN_USER) {

        this.showLogin = true;
      } else {

        this.showLogin = false;
      }
    });

    /*
    this.authService.getAuthStatus().subscribe( (user:User) => {
      if( user == AuthService.UNKNOWN_USER) {
        console.log('Unknown user in charts');
        this.showLogin = true;
      } else {
        console.log('Known user in charts');
        this.showLogin = false;
      }
    });
    */
    const theSub = this.route.params.pipe(
      // concatMap(prms => { return this.httpService.getSecurityView(prms['fullid'], dateStr) })
      concatMap( prms => this.routeChangedDetected(prms))
    );

    theSub.subscribe( res => {

      const dataList = []
      let status =  res['status']


      if(status == 'login') {
        this.showLogin = true;
      } else {
        this.showLogin = false;
      }
     // const keys = Object.keys(res['summary']);
      this.dailyData = res['daily'];

      this.interactiveChartOptions['series'][0]['data'] = this.dailyData;
      this.interactiveChartOptions['series'][1]['data'] = res['volume']
      this.isLoading = false;
      this.interactiveUpdateFlag = true;


    });


  }

  ngOnInit() {

  }

  routeChangedDetected( prms) : Observable<any> {
    // const dateStr = '2018-08-21';
    return this.httpService.getSecurityView(prms['fullid']);
  }

}
