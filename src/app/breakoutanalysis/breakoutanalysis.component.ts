import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/httpservice.service';
import * as moment from 'moment';

@Component({
  selector: 'app-breakoutanalysis',
  templateUrl: './breakoutanalysis.component.html',
  styleUrls: ['./breakoutanalysis.component.css']
})
export class BreakoutanalysisComponent implements OnInit {

  staticBoxBreakoutDataSource = [];
  staticBreakoutColumns: string[] = ['stock' , 'fromdate' , 'todate' , 'highesthigh' , 'lowestlow' ,  'breakoutcompare']

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getStaticBoxBreakout('all').subscribe( response => {
      let results = response['results'];


      let breakoutResults = [];

      for(let row of results) {
        let breakoutResult = {};
        let toDate = moment(row['todate']).format("d-MMM-YYYY");
        let fromDate = moment(row['fromdate']).format("d-MMM-YYYY")

        breakoutResult['fullid'] = row['fullid']
        breakoutResult['stock'] = row['stock']
        breakoutResult['todate'] = toDate;
        breakoutResult['fromdate'] = fromDate;
        breakoutResult['highesthigh'] = row['highesthigh']
        breakoutResult['lowestlow'] = row['lowestlow']
        breakoutResult['breakoutcompare'] = row['breakoutcompare']

        breakoutResults.push(breakoutResult)


      }
      this.staticBoxBreakoutDataSource = breakoutResults;

    })
  }

}
