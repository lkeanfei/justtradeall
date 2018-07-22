import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import {chart} from 'highcharts';

@Component({
  selector: 'app-highstock',
  templateUrl: './highstock.component.html',
  styleUrls: ['./highstock.component.css']
})
export class HighstockComponent implements OnInit {

  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
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
      crosshair: true
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
      tickPixelInterval: 5,
      crosshair: true,
      tickInterval: 0.02,
      categories: [1.01, 1.02, 1.03, 1.04, 1.05],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
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
    data: [107, 31, 635, 203, 2]
  }]}
  // chartCallback = function (chart) { ... } // optional function, defaults to null



  constructor() {
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

}
