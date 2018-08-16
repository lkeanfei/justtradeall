import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
 import { BehaviorSubject} from 'rxjs/index';
import { Market } from '../shared/market.model';
import {AngularFireDatabase} from 'angularfire2/database';
import _ from 'lodash';
import * as Rx from 'rxjs';
import * as moment from 'moment';
import {merge} from 'rxjs';
import {map } from 'rxjs/operators';
import {DataSource} from '@angular/cdk/collections';
import {AuthService} from '../shared/security/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import * as Plotly from 'plotly.js';
import {HttpService} from "../shared/httpservice.service";
import * as Highcharts from 'highcharts/highstock';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  candleData = [];
  layoutRight = {};
  y = [];
  yRangeMin: number;
  yRangeMax: number;
  yInterval: number;
  dataPointsLength: number;
  Highcharts = Highcharts; // required
  chartConstructor = 'stockChart'; // optional string, defaults to 'chart'
  histoConstructor = 'chart'
  klseData = [];

  topGainersDateSource = [];
  topGainersPctDateSource = [];
  topGainersColumns: string[] = ['stock', 'last', 'change'];
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  dataSource = new MatTableDataSource();
  exampleDatabase = new ExampleDatabase();
  data: Market;
  searchField: FormControl;
  subject: BehaviorSubject<string>;
  marketList: Array<string>;
  chartOptions: any;



  constructor(db: AngularFireDatabase ,private httpService: HttpService, private authService: AuthService) {

    this.marketList = new Array();
    this.marketList.push("Bursa");
    this.data = new Market( 'Bursa', '' , new Observable());
    this.subject = new Rx.BehaviorSubject(this.data.selectedDate);

    this.authService.loginChanged.subscribe(
      (isLoggedIn: Boolean) => {
        console.log('Inside home component ' + isLoggedIn);
      }
    );

    this.httpService.getFrontPageView().subscribe( (frontPageData :any)=> {
        console.log('Get frong page' )
        console.log(frontPageData);
        this.topGainersDateSource = frontPageData["topgainers"];
        this.topGainersPctDateSource = frontPageData["topgainerspct"]

    })

    const subscription = this.subject.subscribe(
      (dateSelected:string ) => {
        console.log('Next date selected: ' + dateSelected);

        // const momentSelected: moment.Moment = moment(dateSelected , 'DD-MMM-YYYY');
        //
        // for( let localMarketHighList of this.marketSummaryService.arrayMarketHighList)
        // {
        //
        //   console.log("Inside subscribe date loop :" + localMarketHighList.getDate() );
        //   if (localMarketHighList.getDate() ===  momentSelected.format('YYYY-MM-DD')) {
        //     this.highListStockItems = localMarketHighList.getHighListItems();
        //   }
        // }
        //
        // for( let localMarketLowList of this.marketSummaryService.arrayMarketLowList)
        // {
        //   if (localMarketLowList.getDate() === momentSelected.format('YYYY-MM-DD')) {
        //     this.lowListStockItems = localMarketLowList.getLowListItems();
        //   }
        // }







      } ,
      (err) => {} ,
      () => { console.log('Completed'); }
    );

    // subscribe to the trading day
    db.list('/tradingdays').valueChanges().subscribe((data: Array<Object>) => {
      const itemList: Array<Object> = new Array();

      for ( const tradingDayObj of data) {
        console.log(tradingDayObj);
        itemList.push(tradingDayObj);
      }

      const maxDate =  _.maxBy(itemList);
      this.data.selectedDate = maxDate;
      // to watch for changes in date or country selection

      console.log('max date ' + maxDate);
      const myMoment: moment.Moment =  moment(maxDate , 'YYYY-MM-DD');
      this.subject.next(myMoment.format('DD-MMM-YYYY'));
    });
    // map(db.list('/tradingdays').valueChanges())
    // this.data.dateList = db.list('/tradingdays').valueChanges().(
    //   (data: Array<Object>) => {
    //     const itemList: Array<Object> = new Array();
    //
    //     for ( let tradingDayObj of data) {
    //       console.log(tradingDayObj);
    //       itemList.push(tradingDayObj);
    //     }
    //
    //     const maxDate =  _.maxBy(itemList);
    //     this.data.selectedDate = maxDate;
    //     // to watch for changes in date or country selection
    //
    //     console.log('max date ' + maxDate);
    //     let myMoment : moment.Moment =  moment(maxDate , 'YYYY-MM-DD');
    //     this.subject.next(myMoment.format('DD-MMM-YYYY'));
    //
    //     return itemList;
    //   }
    //
    // );

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    // this.dataSource.filter = filterValue;

  }

  addElement() {
    this.exampleDatabase.addUser();
    //  this.exampleDatabase.addElement( 21 );

  }

  onFormSubmit()  {
    console.log('Submitted! ' + this.searchField.value);
  }



  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  ngOnInit() {
    this.searchField = new FormControl();
    const input = { 'id' : '0200I.MY', 'fromDate' : '2010-01-01' , 'toDate' : '2018-04-20' , 'intra' : false};
    this.httpService.getPriceVolume(input).subscribe((data:any) => {
         this.plotKLSEChart(data);
    });
  }

  plotKLSEChart(data) {
    let dateList = data['daily']['dates'];
    let openList = data['daily']['open'];
    let highList = data['daily']['high'];
    let lowList = data['daily']['low'];
    let closeList = data['daily']['close'];
    let volumeList = data['daily']['volume'];

    this.dataPointsLength = dateList.length;
    this.yRangeMin = Math.min(...openList.concat(highList, lowList, closeList));
    this.yRangeMax = Math.max(...openList.concat(highList, lowList, closeList)) ;

    let dataLength = dateList.length;
    let cnt = 0;

    let klseCandles = []
    while( cnt < dataLength) {
       let tempData = []
       tempData.push( Date.parse(dateList[cnt]));
       tempData.push( openList[cnt]);
       tempData.push( highList[cnt]);
       tempData.push( lowList[cnt]);
       tempData.push( closeList[cnt]);

       klseCandles.push(tempData);
       cnt++;
    }

    this.klseData = klseCandles;

    this.chartOptions = {
      series: [{
        type : 'candlestick',
        data: this.klseData
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


    //
    // for( const arrayIndex of range(0,dataLength)) {
    //     console.log('dateStr ' + dateStr + '. Timestamp ' + Date.parse(dateStr))
    // }

    // this.plotCandlesticks(dateList, openList, highList, lowList , closeList , volumeList);

  }


  plotCandlesticks(dateList,openList, highList, lowList , closeList , volumeList) {

    console.log("Plotting candlesticks")
    const candletrace = {
      x: dateList,
      close: closeList,
      open: openList,
      high: highList,
      low: lowList,
      decreasing: {line: {color: '#7F7F7F'}},
      increasing: {line: {color: '#17BECF'}},
      line: {color: 'rgba(31,119,180,1)'},
      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y'
    };
    let widthArray = new Array(dateList.length);
    widthArray = widthArray.fill(0.25 * 1000 * 3600 * 24, 0);

    const voltrace = {
      x: dateList,
      y: volumeList,
      width: widthArray,
      marker: {color: 'rgb(211, 211, 211)'},
      type: 'bar',
      yaxis: 'y2',
    }


    const candledata = [candletrace, voltrace];
    const minVol = Math.min(...volumeList);
    const maxVol = Math.max(...volumeList);

    console.log('min vol is ' + minVol + '.max vol ' + maxVol);

    const candlelayout = {
      dragmode: 'zoom',
      width: 780,
      height: 500,
      margin: {
        r: 45,
        t: 25,
        b: 40,
        l: 60
      },
      showlegend: false,
      hovermode: 'closest',
      xaxis: {
        autorange: true,
        showspikes: true,
        spikemode: 'toaxis+across+marker',
        spikesnap: 'cursor',
        spikethickness: 1,
        spikedash: 'solid',
        nticks: 20,
        domain: [0, 1],
        range: [dateList[0], dateList[this.dataPointsLength - 1]],
        rangeslider: {range: [dateList[0], dateList[this.dataPointsLength - 1]]},
        title: 'Date',
        type: 'date'
      },
      // yaxis: {
      //   autorange: true,
      //   scaleratio: 1,
      //   domain: [0, 1],
      //   range: [114.609999778, 137.410004222],
      //   type: 'linear'
      // },
      yaxis: {
        autotick: false,
        showspikes: true,
        spikemode: 'toaxis+across+marker',
        spikesnap: 'cursor',
        spikethickness: 1,
        spikedash: 'solid',
        side: 'right',
        ticks: 'outside',
        tick0: this.yRangeMin,
        dtick: this.yInterval,
        ticklen: 4,
        tickwidth: 2,
        tickcolor: '#000',
        range: [this.yRangeMin, this.yRangeMax],
      },
      yaxis2: {
        title: 'Volume',
        overlaying: 'y',
        autotick: true,
        showspikes: true,
        showgrid: false,
        spikemode: 'toaxis+across+marker',
        spikesnap: 'cursor',
        spikethickness: 1,
        spikedash: 'solid',
        side: 'left',
        ticks: 'outside',
        ticklen: 4,
        tickwidth: 2,
        tickcolor: '#000',
        range: [minVol, 10 * maxVol],
        tick0: minVol

      },
    };

    console.log('candle y range min ' + this.yRangeMin);
    console.log('candle y range max ' + this.yRangeMax);

    let candlePromise: any;

    Plotly.newPlot('klseDiv', candledata, candlelayout);


  }

  }

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }

  constructor() {
    // Fill up the database with 100 users.
    for (let i = 0; i < 100; i++) { this.addUser(); }
  }

  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */


export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

