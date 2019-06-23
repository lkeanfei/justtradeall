import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {LayoutServiceService} from "../../../shared/layout-service.service";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css']
})
export class IndicatorsComponent implements OnInit {

  isHandSet = false;
  indicatorsDataSource  = new MatTableDataSource<any>();
  indicatorsColumns = [];;

  constructor(private dataService :DataService , private layoutService: LayoutServiceService) { }

  ngOnInit() {
    this.layoutService.getIsHandSetObservable().subscribe(val => {
      this.isHandSet = val;
    });

    this.dataService.indicatorsData$.subscribe(data=> {
      console.log('indicators')
      console.log(data);
      this.indicatorsColumns = data["columns"];
      this.indicatorsDataSource = data["indicators"];

    });

  }

}
