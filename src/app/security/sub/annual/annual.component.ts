import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-annual',
  templateUrl: './annual.component.html',
  styleUrls: ['./annual.component.css']
})
export class AnnualComponent implements OnInit {

  annualDataSource =  new MatTableDataSource<any>();
  columns = [];


  constructor(private dateService: DataService) { }

  ngOnInit() {
    this.dateService.balanceSheetData$.subscribe( balanceSheetData => {

      if(balanceSheetData["ready"] == false)
      {
        console.log("ready is false");
      }
      else {
        this.columns = []
        this.columns.push("displayname");

        for(let n of balanceSheetData["years"])
        {
          this.columns.push(n);
        }

        this.annualDataSource.data = balanceSheetData["results"];



        console.log(this.columns);
        console.log("Balance sheet data");
        console.log(balanceSheetData);
      }

    })
  }

}
