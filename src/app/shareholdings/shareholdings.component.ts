import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {HttpService} from '../shared/httpservice.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { AngularFirestore , AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from "rxjs";

export interface CompanyData {
  id: string;
  name: string;
  shares: number;
  percentage: number;
}

export interface HoldersData {
  id: string;
  name: string;
  holder: string;
  shares: number;
  percentage: number;
}

export interface MarketCap { market: string; }

export interface SharesChange {
  symbol : string;
  numsharesdelta: number;

}

@Component({
  selector: 'app-shareholdings',
  templateUrl: './shareholdings.component.html',
  styleUrls: ['./shareholdings.component.css']
})
export class ShareholdingsComponent implements OnInit {

  companyField: FormControl;
  shareholderField: FormControl;
  showByStock: boolean;
  hasCompanyResults: boolean;
  hasHolderResults: boolean;
  startSearch: boolean;
  selStyles: any = [];
  rowList : any = []
  companyDataSource: any;
  holdersDataSource: any;
  companyColumns = ['id', 'name', 'shares', 'percentage'];
  holderColumns = ['id', 'holder' , 'name' ,  'shares' , 'percentage']
  options: FormGroup;
  idColumnWidth = 5;
  holderColumnWidth = 20;
  nameColumnWidth = 30;
  sharesColumnWidth = 25;
  percentageColumnWidth = 20;
  companySelectedYear = '2017';
  shareHolderSelectedYear = '2017';
  shareHolderTableLoading: boolean;
  startSearchingShareHolders: boolean;

  // Styling for the loading spinner
  color = 'primary';
  mode = 'indeterminate';
  value = 50;



  constructor(private httpService: HttpService, private fireStore: AngularFirestore, fb: FormBuilder ) {

    this.hasCompanyResults = false;
    this.hasHolderResults = false;
    this.startSearch = false;
    this.showByStock = false;
    this.startSearchingShareHolders = false;
    this.selStyles.push('aqua');
    this.selStyles.push('white');
    this.companyDataSource = new MatTableDataSource<CompanyData>( );
    this.holdersDataSource = new MatTableDataSource<HoldersData>();
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }



  searchBy(index:number) {

    if(index === 0) {
      this.showByStock = true;
      this.selStyles[0] = 'aqua';
      this.selStyles[1] = 'white';

    }else if ( index === 1){
      this.showByStock = false;
      this.selStyles[1] = 'aqua';
      this.selStyles[0] = 'white';
    }
  }

  onSearchCompany() {
    console.log('Search company ' + this.companyField.value);

    this.httpService.searchCompany(this.companyField.value).subscribe( (data:any) => {

      this.companyDataSource.data = data['results'];
      this.hasCompanyResults = true;
    });
  }

  processNumber(num: number) {

  }

  onEnterCompany() {
    console.log('Search company ' + this.companyField.value);
  }

  onSearchShareholders() {
    console.log('Search share holder ' + this.shareholderField.value);
    this.startSearchingShareHolders = true;
    this.hasHolderResults = false;

    this.httpService.searchShareHolders(this.shareholderField.value).subscribe( (data:any) => {

      this.holdersDataSource.data = data['results'];
      this.hasHolderResults = true;
      this.startSearchingShareHolders = false;
    });
  }

  ngOnInit() {
    this.companyField = new FormControl();
    this.shareholderField = new FormControl();

    let items: Observable < SharesChange[] >;

    items = this.fireStore.collection<SharesChange>("/marketcap/bursa/26-02-2019/").valueChanges();

    items.subscribe( arr => {
      for(let i=0; i< arr.length; i++){
        console.log('Symbol ' +  arr[i].symbol  +  ' '  + arr[i].numsharesdelta); //use i instead of 0
      }
    } );


    /*
        this.fireStore.collection("marketcap").snapshotChanges().subscribe( val=> {
             console.log(val);
             console.log('*****');
             console.log(JSON.stringify(val[0]))

        });
        */
  }

}
