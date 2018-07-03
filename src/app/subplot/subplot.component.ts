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

    const layout = {
      xaxis: {domain: [0, 0.45]},
      yaxis: {domain: [0, 0.45]},
      xaxis2: {domain: [0.55, 1]},

    };

    Plotly.newPlot('myDiv', data, layout);

    // const bardata = [{
    //   type: 'bar',
    //   x: [20, 14, 23],
    //   y: [2.05, 2.10, 2.15],
    //   orientation: 'h'
    // }];

    // Plotly.newPlot('barDiv', bardata);
  }

}
