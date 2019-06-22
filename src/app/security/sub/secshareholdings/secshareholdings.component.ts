import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../shared/httpservice.service";
import {Observable} from "rxjs/index";
import {concatMap } from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from '@angular/material';
import {CompanyData} from '../../../shareholdings/shareholdings.component';
import {LayoutServiceService} from "../../../shared/layout-service.service";
import {AngularFirestore} from '@angular/fire/firestore';
import {DataService} from '../../data.service';

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
  showDistHoldingsTable: boolean;
  showTop30Table : boolean;
  distholdingsColumns = ['levelname', 'numshareholders', 'numshares', 'sharespercentage'];
  Top30Columns =  ['Holderid', 'Detailname', 'Shares', 'Percentage'];
  distholdingsDataSource: any;
  top30DataSource: any;
  yearDisplay: string;
  tableCellFontClass: string;

  isLoading = true
  isHandSet = false;

  color = 'primary';
  mode = 'indeterminate';
  value = 50;


  constructor(private route: ActivatedRoute ,private httpService: HttpService,
              private dataService: DataService,
              private layoutService: LayoutServiceService , private fireStore: AngularFirestore) {

    this.distholdingsDataSource = new MatTableDataSource<DistHoldingsData>( );
    this.top30DataSource = new MatTableDataSource<ShareHolderData>();

    this.dataService.top30Data$.subscribe(data => {
      this.top30DataSource.data =data;
    });

    const theSub = this.route.params.pipe(
      concatMap( prms => this.routeChangedDetected(prms))
    );

    this.layoutService.getIsHandSetObservable().subscribe(isHandset => {
      this.isHandSet = isHandset;
       if(isHandset) {
         this.tableCellFontClass = 'handsetfont';
       }
       else {
         this.tableCellFontClass = 'normalfont';
       }
    })

    theSub.subscribe( res => {

      const dataList = []
      let status = res['status']
      console.log('The secshareholdings status is ' + status);

      if (status == 'login') {
        this.showLogin = true;
      } else {
        this.showLogin = false;
        this.yearDisplay = res['top30year'];




        this.distholdingsDataSource.data = res['distlist'];
        this.top30DataSource.data = res['top30list'];

        if (this.distholdingsDataSource.data.length > 0) {
          this.showDistHoldingsTable = true;
        }
        else {
          this.showDistHoldingsTable = false;
        }

        if (this.top30DataSource.data.length > 0 ) {
          this.showTop30Table = true;
        }
        else {
          this.showTop30Table = false;
        }

        this.isLoading = false;

      }
    })

  }

  ngOnInit() {



  }

  routeChangedDetected( prms) : Observable<any> {

    return this.httpService.getHoldingsDistAndTop30View(prms['fullid']);
  }

}
