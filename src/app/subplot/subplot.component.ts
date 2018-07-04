import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout, ScatterData} from 'plotly.js';

@Component({
  selector: 'app-subplot',
  templateUrl: './subplot.component.html',
  styleUrls: ['./subplot.component.css']
})
export class SubplotComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const trace1 = {
      x: [1, 2, 3],
      y: [2, 3, 4],
      xaxis: 'x',
      yaxis: 'y',
      type: 'scatter'
    };

    const trace2 = {
      x: [2, 3, 4],
      y: [5, 16, 5],
      xaxis: 'x2',
      yaxis: 'y',
      type: 'scatter'
    };

    const bardata = [{
      type: 'bar',
      x: [2, 3, 4],
      y: [5, 16, 5],
      xaxis: 'x2',
      yaxis: 'y',
      orientation: 'h'
    }];

    const data = [trace1, trace2];

    const layout1 = {
      autosize: false,
      width: 300,
      height: 300,
      margin: {
        l: 5,
        r: 5,
        b: 5,
        t: 5,
        pad: 4
      },

      xaxis: {domain: [0, 0.45]},
      yaxis: {
        autotick: false,
        scaleratio: 0.2,
        ticks: 'outside',
        tick0: 0,
        dtick: 2,
        ticklen: 18,
        tickwidth: 1,
        tickcolor: '#000',
        range: [0,30],
        domain: [0, 1]
      },
      xaxis2: {domain: [0.55, 1]},

    };

    const layout = {
      autosize: false,
      width: 300,
      height: 300,
      margin: {
        l: 15,
        r: 15,
        b: 15,
        t: 15,
        pad: 4
      },
      paper_bgcolor: '#7f7f7f',
      plot_bgcolor: '#c7c7c7',
      xaxis: {domain: [0, 0.45]},
      yaxis: {domain: [0, 1]},
      xaxis2: {domain: [0.55, 1]},

    };

    const leftChart = [trace1];
    const rightChart = [trace2];
    // Plotly.newPlot('myDiv', data, layout);
    const datatop = [
      {
        x: [0, 1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13, 14,15,16,17,18,19,20],
        y: [0, 1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13, 14,15,16,17,18,19,20],
        type: 'scatter'
      }
    ];
    const layouttop = {
      autosize: false,
      width: 500,
      height: 500,
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60,
        pad: 4
      },
      paper_bgcolor: '#7f7f7f',
      plot_bgcolor: '#c7c7c7'
    };
    Plotly.newPlot('leftDiv', datatop, layouttop);
    // Plotly.newPlot('leftDiv', leftChart, layout);
    Plotly.newPlot('rightDiv', datatop, layouttop);

    const trace1 = {
      x: ['2017-01-04', '2017-01-05', '2017-01-06', '2017-01-09', '2017-01-10', '2017-01-11', '2017-01-12',
        '2017-01-13', '2017-01-17', '2017-01-18', '2017-01-19', '2017-01-20', '2017-01-23', '2017-01-24', '2017-01-25',
        '2017-01-26', '2017-01-27', '2017-01-30', '2017-01-31', '2017-02-01', '2017-02-02', '2017-02-03', '2017-02-06',
        '2017-02-07', '2017-02-08', '2017-02-09', '2017-02-10', '2017-02-13', '2017-02-14', '2017-02-15'],
      close: [116.019997, 116.610001, 117.910004, 118.989998, 119.110001, 119.75, 119.25, 119.040001, 120, 119.989998,
        119.779999, 120, 120.080002, 119.970001, 121.879997, 121.940002, 121.949997, 121.629997, 121.349998, 128.75,
        128.529999, 129.080002, 130.289993, 131.529999, 132.039993, 132.419998, 132.119995, 133.289993, 135.020004, 135.509995],

      decreasing: {line: {color: '#7F7F7F'}},

      high: [116.510002, 116.860001, 118.160004, 119.43, 119.379997, 119.93, 119.300003, 119.620003, 120.239998, 120.5, 120.089996,
        120.449997,
        120.809998, 120.099998, 122.099998, 122.440002, 122.349998, 121.629997, 121.389999, 130.490005, 129.389999, 129.190002, 130.5,
        132.089996, 132.220001, 132.449997, 132.940002, 133.820007, 135.089996, 136.270004],

      increasing: {line: {color: '#17BECF'}},

      line: {color: 'rgba(31,119,180,1)'},

      low: [115.75, 115.809998, 116.470001, 117.940002, 118.300003, 118.599998, 118.209999, 118.809998, 118.220001, 119.709999, 119.370003,
        119.730003, 119.769997, 119.5, 120.279999, 121.599998, 121.599998, 120.660004, 120.620003, 127.010002, 127.779999, 128.160004,
        128.899994,
        130.449997, 131.220001, 131.119995, 132.050003, 132.75, 133.25, 134.619995],

      open: [115.849998, 115.919998, 116.779999, 117.949997, 118.769997, 118.739998, 118.900002, 119.110001, 118.339996, 120, 119.400002,
        120.449997, 120, 119.550003, 120.419998, 121.669998, 122.139999, 120.93, 121.150002, 127.029999, 127.980003, 128.309998, 129.130005,
        130.539993, 131.350006, 131.649994, 132.460007, 133.080002, 133.470001, 135.520004],

      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y'
    };

    const trace2 = {
      x: [20, 30, 40],
      y: [50, 60, 70],
      xaxis: 'x2',
      yaxis: 'y2',
      type: 'scatter'
    };

    const candledata = [trace1];

    const candlelayout = {
      dragmode: 'zoom',
      width: 500,
      height: 500,
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60
      },
      showlegend: false,
      xaxis: {
        autorange: true,
        domain: [0, 1],
        range: ['2017-01-03 12:00', '2017-02-15 12:00'],
        rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']},
        title: 'Date',
        type: 'date'
      },
      yaxis: {
        autorange: true,
        domain: [0, 1],
        range: [114.609999778, 137.410004222],
        type: 'linear'
      },
    };

    Plotly.newPlot('candleDiv', candledata, candlelayout);

    // const bardata = [{
    //   type: 'bar',
    //   x: [20, 14, 23],
    //   y: [2.05, 2.10, 2.15],
    //   orientation: 'h'
    // }];

    // Plotly.newPlot('barDiv', bardata);
  }

}
