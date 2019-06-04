import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {DataService} from "../../data.service";
import {LayoutServiceService} from "../../../shared/layout-service.service";

@Component({
  selector: 'app-annual',
  templateUrl: './annual.component.html',
  styleUrls: ['./annual.component.css']
})
export class AnnualComponent implements OnInit {

  balanceSheetDataSource =  new MatTableDataSource<any>();
  profitLossDataSource = new MatTableDataSource<any>();
  cashFlowDataSource  = new MatTableDataSource<any>()

  balanceSheetColumns = [];
  profitLossColumns = [];
  cashFlowColumns = []

  isHandSet = false;

  constructor(private dateService: DataService , private layoutService: LayoutServiceService) { }

  ngOnInit() {

    this.layoutService.getIsHandSetObservable().subscribe(val => {
      this.isHandSet = val;
    });
    this.dateService.annualData$.subscribe( annualData => {

      if(annualData["ready"] == false)
      {
       // console.log("ready is false");
      }
      else {
        // Balance Sheet
        this.balanceSheetColumns = []
        this.balanceSheetColumns.push("displayname");

        for(let n of annualData["balancesheet"]["years"])
        {
          this.balanceSheetColumns.push(n);
        }

        this.balanceSheetDataSource.data = annualData["balancesheet"]["results"];

        // Profit Loss
        this.profitLossColumns = [];
        this.profitLossColumns.push("displayname");

        for(let n of annualData["profitloss"]["years"])
        {
          this.profitLossColumns.push(n);
        }

        this.profitLossDataSource.data = annualData["profitloss"]["results"];

        // Cash Flow
        this.cashFlowColumns = []
        this.cashFlowColumns.push("displayname");

        for(let n of annualData["cashflow"]["years"])
        {
          this.cashFlowColumns.push(n);
        }

        this.cashFlowDataSource.data = annualData["cashflow"]["results"];


      }

    })
  }

}
