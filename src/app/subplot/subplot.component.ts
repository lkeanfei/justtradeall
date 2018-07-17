import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout, ScatterData} from 'plotly.js';
import {HttpService } from '../shared/httpservice.service';

@Component({
  selector: 'app-subplot',
  templateUrl: './subplot.component.html',
  styleUrls: ['./subplot.component.css']
})
export class SubplotComponent implements OnInit {
  rangeStart = 113;
  histoData = [];
  layoutRight = {};
  y = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {

    const input = { 'id' : '0010.MY', 'fromDate' : '2018-04-01' , 'toDate' : '2018-04-30' , 'intra' : true};
    this.httpService.getPriceVolume(input).subscribe((data:any) => {
      console.log('Price data is ');
      console.log(data);
      this.plotHistogram();
      // const dataRight = [
      //    {
      //      x: [  0, 1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13, 14,15,16,17,18,19,20],
      //      y: [ 120, 121, 122, 123, 124, 125, 126, 127, 128, 129,130,131,132,133, 134,135,136,137,138,139, 140],
      //      type: 'scatter'
      //    }
      //  ];
      //  this.layoutRight = {
      //    autosize: false,
      //    xaxis: {
      //      tickmode: 'array',
      //      tickvals: [1,3,5,7,9,11,13,15,17,19,21],
      //      tick0: 3
      //    },
      //    //  yxis: {
      //    //   // scaleanchor: "x",
      //    //   // scaleratio: 0.5,
      //    //    ticklen: 15,
      //    //   tickmode: 'linear',
      //    //   // tickvals: [115.0,120.0,125.0,130.0,135.0,140.0],
      //    //   tick0: 115,
      //    //    dtick: 3,
      //    //   range: [100, 137.410004222],
      //    // },
      //    yaxis: {
      //      autotick: false,
      //      ticks: 'outside',
      //      tick0: this.rangeStart,
      //      dtick: 2,
      //      ticklen: 8,
      //      tickwidth: 4,
      //      tickcolor: '#000',
      //      range: [this.rangeStart, 150],
      //    },
      //    width: 200,
      //    height: 500,
      //    margin: {
      //      r: 40,
      //      t: 25,
      //      b: 154,
      //      l: 60,
      //      pad: 4
      //    },
      //    // paper_bgcolor: '#7f7f7f',
      //    // plot_bgcolor: '#c7c7c7'
      //  };
      //
      //  const barData = [{
      //    type: 'bar',
      //    x: [20, 14, 23],
      //    y: [ '115', '120', '130'],
      //    orientation: 'h',
      //    // yaxis: {
      //    //   autotick: false,
      //    //   ticks: 'outside',
      //    //   tick0: 115,
      //    //   dtick: 2,
      //    //   ticklen: 8,
      //    //   tickwidth: 4,
      //    //   tickcolor: '#000',
      //    //   range: [115, 150],
      //    // },
      //  }];
      //  this.y = [];
      //  for (let i = 0; i < 500; i ++) {
      //    this.y[i] = Math.random() * 30 + 116;
      //  }
      //
      //  this.histoData = [
      //    {
      //      y: this.y,
      //      type: 'histogram',
      //      marker: {
      //        color: 'black',
      //      },
      //    }
      //  ];
      //  Plotly.newPlot('histoDiv', this.histoData , this.layoutRight);
      this.plotCandlesticks(data["daily"]["dates"], data["daily"]["open"] , data["daily"]["high"] , data["daily"]["low"], data["daily"]["close"] , data["daily"]["volume"]);

    });
    const myPlot = document.getElementById('');





    const candleDiv : any = document.getElementById('candleDiv');
    let timerId = 0;
    let startDate , endDate;
    candleDiv.on('plotly_relayout', (eventdata) =>{
      if( Object.prototype.toString.call(eventdata['xaxis.range']) === '[object Array]' ) {
        console.log('rangeslider event!!');


        startDate = eventdata['xaxis.range'][0];
        endDate = eventdata['xaxis.rane'][1];


        if(timerId>=0){
          //timer is running: stop it
          window.clearTimeout(timerId);
        }

        timerId = window.setTimeout(function(){
          //fire end event
          console.log('rangeslider event ENDS');
          console.log('starts '  + startDate);
          console.log('ends '  + endDate);

          //reset timer to undefined
          timerId = -1;
        }, 800);
      }
    })

    // const bardata = [{
    //   type: 'bar',
    //   x: [20, 14, 23],
    //   y: [2.05, 2.10, 2.15],
    //   orientation: 'h'
    // }];

    // Plotly.newPlot('barDiv', bardata);
  }

  plotCandlesticks(dateList,openList, highList, lowList , closeList , volumeList) {

    let yRangeMin: number , yRangeMax: number;
    let dataPointsLength = dateList.length;
    yRangeMin = Math.min(openList.concat(highList, lowList, closeList));
    yRangeMax = Math.max(openList.concat(highList, lowList, closeList));

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



    const candledata = [candletrace];

    const candlelayout = {
      dragmode: 'zoom',
      width: 800,
      height: 500,
      margin: {
        r: 35,
        t: 25,
        b: 40,
        l: 60
      },
      showlegend: false,
      hovermode: 'closest',
      xaxis: {
        autorange: true,
        showspikes : true,
        nticks: 20,
        domain: [0, 1],
        range: [dateList[0], dateList[dataPointsLength - 1]],
        rangeslider: {range: [dateList[0], dateList[dataPointsLength - 1]]},
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
        showspikes : true,
        side: 'right',
        ticks: 'outside',
        tick0: yRangeMin,
        dtick: 0.005,
        ticklen: 8,
        tickwidth: 4,
        tickcolor: '#000',
        range: [yRangeMin, yRangeMax],
      },
    };

    Plotly.newPlot('candleDiv', candledata, candlelayout);

  }

  plotHistogram() {
    const dataRight = [
      {
        x: [  0, 1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13, 14,15,16,17,18,19,20],
        y: [ 120, 121, 122, 123, 124, 125, 126, 127, 128, 129,130,131,132,133, 134,135,136,137,138,139, 140],
        type: 'scatter'
      }
    ];
    this.layoutRight = {
      autosize: false,
      xaxis: {
        tickmode: 'array',
        tickvals: [1,3,5,7,9,11,13,15,17,19,21],
        tick0: 3
      },
      //  yxis: {
      //   // scaleanchor: "x",
      //   // scaleratio: 0.5,
      //    ticklen: 15,
      //   tickmode: 'linear',
      //   // tickvals: [115.0,120.0,125.0,130.0,135.0,140.0],
      //   tick0: 115,
      //    dtick: 3,
      //   range: [100, 137.410004222],
      // },
      yaxis: {
        autotick: false,
        ticks: 'outside',
        tick0: this.rangeStart,
        dtick: 2,
        ticklen: 8,
        tickwidth: 4,
        tickcolor: '#000',
        range: [this.rangeStart, 150],
      },
      width: 200,
      height: 500,
      margin: {
        r: 40,
        t: 25,
        b: 154,
        l: 60,
        pad: 4
      },
      // paper_bgcolor: '#7f7f7f',
      // plot_bgcolor: '#c7c7c7'
    };

    const barData = [{
      type: 'bar',
      x: [20, 14, 23],
      y: [ '115', '120', '130'],
      orientation: 'h',
      // yaxis: {
      //   autotick: false,
      //   ticks: 'outside',
      //   tick0: 115,
      //   dtick: 2,
      //   ticklen: 8,
      //   tickwidth: 4,
      //   tickcolor: '#000',
      //   range: [115, 150],
      // },
    }];

    // Plotly.newPlot('rightBarDiv', barData, layoutRight);
    this.y = [];
    for (let i = 0; i < 500; i ++) {
      this.y[i] = Math.random() * 30 + 116;
    }

    this.histoData = [
      {
        y: this.y,
        type: 'histogram',
        marker: {
          color: 'black',
        },
      }
    ];
    Plotly.newPlot('histoDiv', this.histoData , this.layoutRight);

  }

  clickButton() {
    this.rangeStart = this.rangeStart - 2;
    console.log('Rage start ' + this.rangeStart);
    this.y = [];
    for (let i = 0; i < 500; i ++) {
      this.y[i] = Math.random() * 30 + 116;
    }

    this.histoData = [
      {
        y: this.y,
        type: 'histogram',
        marker: {
          color: 'black',
        },
      }
    ];

    this.layoutRight = {
      autosize: false,
      xaxis: {
        tickmode: 'array',
        tickvals: [1,3,5,7,9,11,13,15,17,19,21],
        tick0: 3
      },
      //  yxis: {
      //   // scaleanchor: "x",
      //   // scaleratio: 0.5,
      //    ticklen: 15,
      //   tickmode: 'linear',
      //   // tickvals: [115.0,120.0,125.0,130.0,135.0,140.0],
      //   tick0: 115,
      //    dtick: 3,
      //   range: [100, 137.410004222],
      // },
      yaxis: {
        autotick: false,
        ticks: 'outside',
        tick0: this.rangeStart,
        dtick: 0.005,
        ticklen: 8,
        tickwidth: 4,
        tickcolor: '#000',
        range: [this.rangeStart, 150],
      },
      width: 200,
      height: 500,
      margin: {
        r: 40,
        t: 25,
        b: 154,
        l: 60,
        pad: 4
      },
      // paper_bgcolor: '#7f7f7f',
      // plot_bgcolor: '#c7c7c7'
    };
    Plotly.newPlot('histoDiv', this.histoData, this.layoutRight);
  }

}
