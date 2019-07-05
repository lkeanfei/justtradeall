import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {LayoutServiceService} from "../../../shared/layout-service.service";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  isHandset = false;
  hasForecast = false;
  hasForecastHistory = false;
  forecastDate = "";
  tradeDate = "";
  pointForecast: number;
  lower80: number;
  upper80: number;
  lower95: number;
  upper95: number;
  colWidths = [];

  forecast80DataSource = new MatTableDataSource();
  forecast95DataSource = new MatTableDataSource();
  relatedCountersDataSource = new MatTableDataSource();
  relatedColumns = []
  forecastAccuracyColumns = []

  constructor(private dataService: DataService, private layoutService: LayoutServiceService) {

    this.layoutService.getIsHandSetObservable().subscribe( data => {
      this.isHandset = data;
    });

    this.dataService.forecastData$.subscribe( forecastData => {
        this.hasForecast =  forecastData["status"] == 'ok';

        this.relatedCountersDataSource.data = forecastData["relatedlist"]
        this.relatedColumns = forecastData["relatedcolumns"]

        if(this.hasForecast) {
           this.tradeDate = forecastData["tradedate"];
           this.forecastDate = forecastData["forecastdate"];
           this.pointForecast = forecastData["pointforecast"]
           this.lower80 = forecastData['lower80'];
           this.upper80 = forecastData['upper80'];
           this.lower95 = forecastData['lower95'];
           this.upper95 = forecastData['upper95'];
        }
    });

    this.dataService.forecastAccuracyData$.subscribe(forecastAccData => {
          console.log('Forecast Acc Data!');
          console.log(forecastAccData);
          if( forecastAccData["list80"].length > 0 )
          {
            this.hasForecastHistory = true;
            this.forecast80DataSource.data = forecastAccData["list80"];
            this.forecast95DataSource.data = forecastAccData["list95"];
            this.forecastAccuracyColumns = forecastAccData["columns"];
            this.colWidths = forecastAccData["columnwidths"]
          }
          else {
            this.hasForecastHistory = false;
          }

    });

    }

  ngOnInit() {
  }

}
