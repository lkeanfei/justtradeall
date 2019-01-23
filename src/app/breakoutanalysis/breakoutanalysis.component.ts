import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../shared/httpservice.service';
import * as moment from 'moment';
import {LayoutServiceService} from '../shared/layout-service.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Store} from "@ngrx/store";
import {Ingredient} from "../shared/Ingredient.model";
import {Observable} from "rxjs/index";
import {UserModel} from "../shared/security/user.model";

@Component({
  selector: 'app-breakoutanalysis',
  templateUrl: './breakoutanalysis.component.html',
  styleUrls: ['./breakoutanalysis.component.css']
})
export class BreakoutanalysisComponent implements OnInit {

  authState: Observable<{user: UserModel}>;
  staticBoxBreakoutDataSource = new MatTableDataSource();
  dynamicBoxBreakoutDataSource = new MatTableDataSource();
  isHandSet = true;
  staticBreakoutColumns: string[] = ['stock' , 'fromdate' , 'todate' , 'highesthigh' , 'lowestlow' ,  'breakoutcompare'];
  dynamicBreakoutColumns: string[] =  ['stock' , 'fromdate' , 'todate' , 'highesthigh' , 'lowestlow' ,  'breakoutcompare'];

  @ViewChild(MatSort) dynamicSort: MatSort;
  @ViewChild(MatSort) staticSort: MatSort;

  constructor(private store:Store<{authUser: {user: UserModel}}> ,private httpService: HttpService, private layoutService: LayoutServiceService) { }

  ngOnInit() {

    this.authState = this.store.select('authUser');


    this.staticBoxBreakoutDataSource.sort = this.staticSort;
    this.dynamicBoxBreakoutDataSource.sort = this.dynamicSort;

    this.staticBoxBreakoutDataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'todate': return moment(item['todate'] , 'DD-MMM-YYYY');
        case 'fromdate': return moment(item['fromdate'] , 'DD-MMM-YYYY');
        default: return item[property];
      }
    };

    this.dynamicBoxBreakoutDataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'todate': return moment(item['todate'] , 'DD-MMM-YYYY');
        case 'fromdate': return moment(item['fromdate'] , 'DD-MMM-YYYY');
        default: return item[property];
      }
    };

    this.layoutService.getIsHandSetObservable().subscribe(isHandset => {
      if(isHandset) {
        this.isHandSet = true;
      }
      else {
        this.isHandSet = false;
      }
    })

    this.httpService.getStaticBoxBreakout('all').subscribe( response => {
      let results = response['results'];


      let breakoutResults = [];

      for(let row of results) {
        let breakoutResult = {};
        let toDate = moment(row['todate']).format("DD-MMM-YYYY");
        let fromDate = moment(row['fromdate']).format("DD-MMM-YYYY")

        breakoutResult['fullid'] = row['fullid']
        breakoutResult['stock'] = row['stock']
        breakoutResult['todate'] = toDate;
        breakoutResult['fromdate'] = fromDate;
        breakoutResult['highesthigh'] = row['highesthigh']
        breakoutResult['lowestlow'] = row['lowestlow']
        breakoutResult['breakoutcompare'] = row['breakoutcompare']

        breakoutResults.push(breakoutResult)


      }
      this.staticBoxBreakoutDataSource.data = breakoutResults;



    })

    this.httpService.getDynamicBoxBreakout('all').subscribe( response => {
      let results = response['results'];


      let breakoutResults = [];

      for(let row of results) {
        let breakoutResult = {};
        let toDate = moment(row['todate']).format("DD-MMM-YYYY");
        let fromDate = moment(row['fromdate']).format("DD-MMM-YYYY")

        breakoutResult['fullid'] = row['fullid']
        breakoutResult['stock'] = row['stock']
        breakoutResult['todate'] = toDate;
        breakoutResult['fromdate'] = fromDate;
        breakoutResult['highesthigh'] = row['highesthigh']
        breakoutResult['lowestlow'] = row['lowestlow']
        breakoutResult['breakoutcompare'] = row['breakoutcompare']

        breakoutResults.push(breakoutResult)


      }
      this.dynamicBoxBreakoutDataSource.data = breakoutResults;

    })
  }

}
