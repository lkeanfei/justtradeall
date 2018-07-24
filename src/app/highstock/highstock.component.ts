import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { SeriesObject} from 'highcharts';
import {chart} from 'highcharts';
import {HttpService} from '../shared/httpservice.service';


@Component({
  selector: 'app-highstock',
  templateUrl: './highstock.component.html',
  styleUrls: ['./highstock.component.css']
})
export class HighstockComponent implements OnInit {

  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  yInterval: number;
  intradayObject: any;
  Highcharts = Highcharts; // required
  chartConstructor = 'stockChart'; // optional string, defaults to 'chart'
  histoConstructor = 'chart'
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
  chartOptions = {
    series: [{
      type : 'candlestick',
      data: this.data
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

  histoChartOptions = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Historic World Population by Region'
    },
    xAxis: {
      type: 'linear',
      minTickInterval: 10,
      tickPixelInterval: 10,

    },
    yAxis: {
      min: 0,
      minTickInterval: 10,
      tickPixelInterval: 10,

      title: {
        text: 'Population (millions)',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
  tooltip: {
    valueSuffix: ' millions'
  },
  plotOptions: {
    bar: {
      pointWidth: 10,
      dataLabels: {
        enabled: true
      }
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -40,
    y: 80,
    floating: true,
    borderWidth: 1,
    shadow: true
  },
  credits: {
    enabled: false
  },
  series: [{
    name: 'Year 1800',
    data: [ [0.1 , 107] , [0.2 , 31], [0.3 ,635], [0.4,203], [0.5,2] ,
      [0.6 , 107] , [0.7 , 31], [0.8 ,635], [0.9,203], [1.0,2] ]
  }]}
  // chartCallback = function (chart) { ... } // optional function, defaults to null



  constructor(private httpService: HttpService) {
    const input = { 'id' : '4707.MY', 'fromDate' : '2018-04-01' , 'toDate' : '2018-04-20' , 'intra' : true};
    this.httpService.getPriceVolume(input).subscribe((data:any) => {
      this.intradayObject = data['intraday'];
      this.calculateOptimalBinWidth();
    });
    this.data = [
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

  }

  ngOnInit() {



  }


  calculateOptimalBinWidth() {

    let prices = Object.keys(this.intradayObject).map( v => parseFloat(v));
    console.log('intArray ****' );
    console.log(prices);

    // const intraDayPrices = Object.keys(this.intradayObject);
    // const histoPriceTransVol = [];
    // let prices = [];
    // for(const price of histoPriceRange) {
    //
    //   const vol = this.intradayObject[price];
    //   const numZeros = Math.log10(vol);
    //   const normalizeVol = vol / Math.pow(10, 3);
    //   for(let cnt=0 ; cnt < normalizeVol ; cnt++) {
    //     prices.push(price);
    //   }
    // }

    let xMax = Math.max(...prices), xMin = Math.min(...prices);
    const delta = (xMax - xMin);
    let interval = Math.ceil( delta/ (20 * 0.005)) * 0.005;
    console.log('Diff ' + (xMax - xMin) + ' interval ' + interval );
    if( interval > 0.10 ) {
      // refine it to a better interval
      console.log('it is bigger than 0.10');
      const newInterval = Math.round(interval * 100);
      interval = (newInterval  + 5 - (newInterval % 5)) / 100
    }
    console.log('Refined interval ' + interval);
    this.yInterval = interval;

    // const minBins = 4, maxBins = 50;
    // // double[] N = Enumerable.Range(minBins, maxBins - minBins)
    // //   .Select(v => (double)v).ToArray();
    // let N = [], D = [], C = [];
    // for (let n = minBins; n < maxBins; n++) {
    //   N.push(n);
    //   D.push((xMax - xMin) / n);
    // }
    //
    // for (let i = 0; i < N.length; i++)
    // {
    //   const binIntervals = this.linearSpace(xMin, xMax, Math.round(N[i]) + 1);
    //   let ki = this.histoGram(x, binIntervals);
    //   // let kiOut = ki.Skip(1).Take(ki.length - 2).ToArray();
    //   let kiOut = ki.slice(1,1 + ki.length - 1);
    //
    //   const mean = this.calcAverage(kiOut);
    //   const variance = this.calcVariance(kiOut , mean , N[i]);
    //   console.log('D[i] is ' + D[i]);
    //
    //   C[i] = (2 * mean - variance) / (Math.pow(D[i], 2));
    // }

    // const minC = Math.min(...C);
    // const minCArray = [];
    // C.forEach( (value,idx) => {
    //    console.log('index is ' + idx + '.Value ' + value + ' minC = ' + minC );
    //    if( Math.abs(value - minC ) < 0.000001) {
    //      minCArray.push({'value' : value , 'index' : idx})
    //    }
    // })
    // console.log('minArray ** ');
    // console.log(minCArray);
    // const index = C.Select((c, ix) => new { Value = c, Index = ix })
    //   .Where(c => c.Value == minC).First().Index;
    // const optimalBinWidth = D[index];
  }

  checkCharts() {
    this.Highcharts.charts[0].options.xAxis
    this.Highcharts.charts[0].getSelectedSeries().forEach( (seriesObject: SeriesObject) => {
      seriesObject.xAxis
    })
  }

}
