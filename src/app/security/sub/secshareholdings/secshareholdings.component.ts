import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../shared/httpservice.service";
import {Observable} from "rxjs/index";
import {concatMap } from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from '@angular/material';
import {CompanyData} from '../../../shareholdings/shareholdings.component';

export interface DistHoldingsData {
  levelname: string;
  numshareholders: number;
  numshares: number;
  percentage: number;
}

export interface ShareHolderData {
  id: number;
  detailname: string;
  shares: number;
  percentage: number;
}

@Component({
  selector: 'app-secshareholdings',
  templateUrl: './secshareholdings.component.html',
  styleUrls: ['./secshareholdings.component.css']
})
export class SecshareholdingsComponent implements OnInit {


  showLogin: boolean;
  distholdingsColumns = ['levelname', 'numshareholders', 'numshares', 'sharespercentage'];
  Top30Columns =  ['id', 'detailname', 'shares', 'percentage'];
  distholdingsDataSource: any;
  top30DataSource: any;

  constructor(private route: ActivatedRoute ,private httpService: HttpService) {

    this.distholdingsDataSource = new MatTableDataSource<DistHoldingsData>( );
    this.top30DataSource = new MatTableDataSource<ShareHolderData>();

    const theSub = this.route.params.pipe(
      concatMap( prms => this.routeChangedDetected(prms))
    );

    theSub.subscribe( res => {

      const dataList = []
      let status = res['status']
      console.log('Sec shareholdings Status is ' + status);

      if (status == 'login') {
        this.showLogin = true;
      } else {
        this.showLogin = false;
        console.log(res['top30year']);
        // console.log(res['distlist']);
        console.log(res['top30list']);



        this.distholdingsDataSource.data = res['distlist'];
        this.top30DataSource.data = res['top30list'];

      }
    })

  }

  ngOnInit() {
  }

  routeChangedDetected( prms) : Observable<any> {

    return this.httpService.getHoldingsDistAndTop30View(prms['fullid']);
  }

}
