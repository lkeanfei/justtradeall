import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout, PlotlyHTMLElement, ScatterData} from 'plotly.js';
import {HttpService } from '../shared/httpservice.service';
import '../../../node_modules/plotly.js/dist/plotly.js';

@Component({
  selector: 'app-subplot',
  templateUrl: './subplot.component.html',
  styleUrls: ['./subplot.component.css']
})
export class SubplotComponent implements OnInit {
  @ViewChild('tag') plotDiv: ElementRef;
  rangeStart = 113;
  histoData = [];
  layoutRight = {};
  y = [];
  yRangeMin: number;
  yRangeMax: number;
  dataPointsLength: number;
  bOrderFlowLoading = true;
  intradayObject: any;
  candleElem: PlotlyHTMLElement;

  constructor(private httpService: HttpService) {
    console.log('on construct triggered!');
    this.bOrderFlowLoading = true;
  }

  ngOnInit() {

    console.log('on init triggered!');

    const input = { 'id' : '0010.MY', 'fromDate' : '2018-04-01' , 'toDate' : '2018-04-30' , 'intra' : true};
    this.httpService.getPriceVolume(input).subscribe((data:any) => {
      this.plotCharts(data);
    });
    const myPlot = document.getElementById('');
    const candleDiv : any = document.getElementById('candleDiv');


    //
    // candleDiv.on('plotly_relayout', (eventdata) => {
    //   console.log('relayout event!');
    //   if( Object.prototype.toString.call(eventdata['xaxis.range']) === '[object Array]' ) {
    //     console.log('rangeslider event!!');
    //
    //
    //     startDate = eventdata['xaxis.range'][0];
    //     endDate = eventdata['xaxis.range'][1];
    //
    //
    //     if(timerId>=0){
    //       //timer is running: stop it
    //       window.clearTimeout(timerId);
    //     }
    //
    //     timerId = window.setTimeout(function(){
    //       //fire end event
    //       console.log('rangeslider event ENDS');
    //       console.log('starts '  + startDate);
    //       console.log('ends '  + endDate);
    //       this.yRangeMin = this.yRangeMin - 0.005;
    //       this.plotHistogram();
    //
    //       //reset timer to undefined
    //       timerId = -1;
    //     }, 800);
    //   }
    // })

  }

  plotCharts(data: any) {

    let dateList = data['daily']['dates'];
    let openList = data['daily']['open'];
    let highList = data['daily']['high'];
    let lowList = data['daily']['low'];
    let closeList = data['daily']['close'];
    let volumeList = data['daily']['volume'];
    this.intradayObject = data['intraday'];

    this.dataPointsLength = dateList.length;
    this.yRangeMin = Math.min(...openList.concat(highList, lowList, closeList));
    this.yRangeMax = Math.max(...openList.concat(highList, lowList, closeList)) ;
    this.bOrderFlowLoading = false;

    this.plotCandlesticks(dateList, openList, highList, lowList , closeList , volumeList);

    this.plotHistogram();

  }
  plotCandlesticks(dateList,openList, highList, lowList , closeList , volumeList) {

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
        showspikes : true,
        spikemode: 'toaxis+across+marker',
        spikesnap: 'cursor',
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
        showspikes : true,
        spikemode: 'toaxis+across+marker',
        spikesnap: 'cursor',
        side: 'right',
        ticks: 'outside',
        tick0: this.yRangeMin,
        dtick: 0.01,
        ticklen: 4,
        tickwidth: 2,
        tickcolor: '#000',
        range: [this.yRangeMin, this.yRangeMax],
      },
    };

    console.log('candle y range min ' + this.yRangeMin);
    console.log('candle y range max ' + this.yRangeMax);

    Plotly.newPlot('candleDiv', candledata, candlelayout).then( (htmlElem: PlotlyHTMLElement) => {
       this.candleElem = htmlElem;

       this.candleElem.on('plotly_relayout', (eventdata) => {
        console.log('relayout event!');
         let timerId = 0;
         let startDate , endDate;
        if( Object.prototype.toString.call(eventdata['xaxis.range']) === '[object Array]' ) {
          console.log('rangeslider event!!');


          startDate = eventdata['xaxis.range'][0];
          endDate = eventdata['xaxis.range'][1];


          if(timerId>=0){
            //timer is running: stop it
            window.clearTimeout(timerId);
          }

          timerId = window.setTimeout(() => {
            //fire end event
            console.log('rangeslider event ENDS');
            console.log('starts '  + startDate);
            console.log('ends '  + endDate);
            this.yRangeMin = this.yRangeMin - 0.005;
            this.plotHistogram();
            //reset timer to undefined
            timerId = -1;
          }, 800);
        }
      });
    });

  }

  calculateOptimalBinWidth( intraDayPrices: number[]) {
    let xMax = Math.max(...intraDayPrices), xMin = Math.min(...intraDayPrices);
    const minBins = 4, maxBins = 50;
    // double[] N = Enumerable.Range(minBins, maxBins - minBins)
    //   .Select(v => (double)v).ToArray();
    let N = [], D = [], C = [];
    for (let n = minBins; n < maxBins; n++) {
      N.push(n);
      D.push((xMax - xMin) / n);
    }

    for (let i = 0; i < N.length; i++)
    {
      const binIntervals = this.linearSpace(xMin, xMax, Math.round(N[i]) + 1);
      let ki = this.histoGram(x, binIntervals);
      // let kiOut = ki.Skip(1).Take(ki.length - 2).ToArray();
      let kiOut = ki.slice(1,1+ki.length-1);

      const mean = this.calcAverage(kiOut);
      const variance = this.calcVariance(kiOut , mean , N[i]);
      console.log('D[i] is ' + D[i]);

      C[i] = (2 * mean - variance) / (Math.pow(D[i], 2));
    }

    const minC = Math.min(...C);
    const index = C.Select((c, ix) => new { Value = c, Index = ix })
      .Where(c => c.Value == minC).First().Index;
    const optimalBinWidth = D[index];
  }

  calcAverage(arr: number[]) {
    let s = 0;

    for (const data of arr) {
      s = s + data;
    }
    return s / arr.length;
  }

  calcVariance(arr: number[], mean: number , nLength: number) {
    let s = 0;
     for(const data of arr ) {
       s = s + Math.pow(data - mean, 2);
     }
     return s / nLength;
  }

  linearSpace(a: number, b: number, count: number) {
     const output: number[];
      for ( let i = 0; i < count; i++) {
        output.push(a + ((i * (b - a)) / (count - 1)));
      }
      return output;
    }

    histoGram(data: number[] , binEdges: number[]) {
      let counts: number[];
      for (let i = 0; i < binEdges.length - 1; i++) {
        const lower = binEdges[i];
        const upper = binEdges[i + 1];
        for (let j = 0; j < data.length; j++) {
          if ((data[j] - lower >= 0.00001) && (data[j] - upper < 0.00001)) {
            counts[i]++;
          }
        }

      }

      return counts;
    }

  // public double[] Histogram(double[] data, double[] binEdges)
  //   {
  //     double[] counts = new double[binEdges.Length - 1];
  //
  //     for (int i = 0; i < binEdges.Length - 1; i++)
  //     {
  //       double lower = binEdges[i], upper = binEdges[i + 1];
  //
  //       for (int j = 0; j < data.Length; j++)
  //       {
  //         if (data[j] >= lower && data[j] <= upper)
  //         {
  //           counts[i]++;
  //         }
  //       }
  //     }
  //
  //     return counts;
  //   }




  // LinearSpace(double a, double b, int count)
  // {
  //   double[] output = new double[count];
  //
  //   for (int i = 0; i < count; i++)
  // {
  //   output[i] = a + ((i * (b - a)) / (count - 1));
  // }
  //
  // return output;
  }
plotHistogram() {

    this.layoutRight = {
      autosize: false,
      yaxis: {
        autotick: false,
        ticks: 'outside',
        tick0: this.yRangeMin,
        dtick: 0.01,
        ticklen: 8,
        tickwidth: 4,
        tickcolor: '#000',
        range: [this.yRangeMin, this.yRangeMax],
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

    // const barData = [{
    //   type: 'bar',
    //   x: [20, 14, 23],
    //   y: [ '115', '120', '130'],
    //   orientation: 'h',
    //   // yaxis: {
    //   //   autotick: false,
    //   //   ticks: 'outside',
    //   //   tick0: 115,
    //   //   dtick: 2,
    //   //   ticklen: 8,
    //   //   tickwidth: 4,
    //   //   tickcolor: '#000',
    //   //   range: [115, 150],
    //   // },
    // }];

    // Plotly.newPlot('rightBarDiv', barData, layoutRight);
    // this.y = [];
    // for (let i = 0; i < 500; i ++) {
    //   this.y[i] = Math.random() * 30 + 116;
    // }

    const histoPriceRange = Object.keys(this.intradayObject);
    const histoPriceTransVol = [];
    let prices = [];
    for(const price of histoPriceRange) {

      const vol = this.intradayObject[price];
      const numZeros = Math.log10(vol);
      const normalizeVol = vol / Math.pow(10, 3);
       for(let cnt=0 ; cnt < normalizeVol ; cnt++) {
        prices.push(price);
      }
    }

    this.histoData = [
      {
        y: prices,
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
