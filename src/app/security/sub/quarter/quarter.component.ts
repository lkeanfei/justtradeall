import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-quarter',
  templateUrl: './quarter.component.html',
  styleUrls: ['./quarter.component.css']
})
export class QuarterComponent implements OnInit {

  quarterliesDataSource  = new MatTableDataSource<any>();
  quarterliesColumns = [];

  constructor(private dataService : DataService) { }

  ngOnInit() {
    this.dataService.quarterliesData$.subscribe( quarterliesData => {

      if(quarterliesData["ready"] == false)
      {
        // console.log("ready is false");
      }
      else {
        // Balance Sheet
        this.quarterliesColumns = []
        this.quarterliesColumns.push("displayname");

        for(let n of quarterliesData["quarters"])
        {
          this.quarterliesColumns.push(n);
        }

        this.quarterliesDataSource.data = quarterliesData["results"];

      }

    });

  }

}
