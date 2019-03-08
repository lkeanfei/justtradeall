import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {HttpService} from '../shared/httpservice.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
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

export interface NumSharesSummaryItem {
  Symbol : string;
  TradeDate : string;
  NumSharesDiff : number;
  PercentageDiff : number;

}

export interface OwnershipSummaryItem {
  Symbol : string;
  Code: string;
  SharesAcquired : number;
  PercentageSharesAcquired : number;
  SharesDisposed : number;
  PercentageSharesDisposed : number;


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
  equitiesTotalShareChangeDataSource: any;
  ownershipSummaryDataSource: any;

  companyColumns = ['id', 'name', 'shares', 'percentage'];
  holderColumns = ['id', 'holder' , 'name' ,  'shares' , 'percentage'];
  equitiesTotalShareChangeColumns = [ 'Symbol' , 'NumSharesDiff'  , 'PercentageDiff'];
  ownershipSummaryColumns = ['Symbol' , 'SharesAcquired' , 'PercentageSharesAcquired' , 'SharesDisposed' ,'PercentageSharesDisposed'];

  options: FormGroup;

  symbolColumnWidth = 20 ;
  totalSharesWidth = 40;
  sharesPercentageWidth = 40

  idColumnWidth = 5;
  holderColumnWidth = 20;
  nameColumnWidth = 30;
  sharesColumnWidth = 25;
  percentageColumnWidth = 20;

  // Ownership summary table
  ownershipSymbolWidth = 8;
  ownershipSharesAcquiredWidth = 23;
  ownershipPercentageSharesAcquiredWidth = 23;
  ownershipSharesDisposedWidth = 23;
  ownershipPercentageSharesDisposedWidth = 23;

  companySelectedYear = '2017';
  shareHolderSelectedYear = '2017';
  shareHolderTableLoading: boolean;
  startSearchingShareHolders: boolean;

  // Styling for the loading spinner
  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  @ViewChild('totalshare') equitiesTotalShareSort: MatSort;
  @ViewChild('ownership') ownershipSummarySort: MatSort;



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
    this.equitiesTotalShareChangeDataSource = new MatTableDataSource<NumSharesSummaryItem>();
    this.ownershipSummaryDataSource = new MatTableDataSource<OwnershipSummaryItem>();

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
    this.equitiesTotalShareChangeDataSource.sort = this.equitiesTotalShareSort;
    setTimeout(() => {
      this.ownershipSummaryDataSource.sort = this.ownershipSummarySort;
    });



    let items: Observable < NumSharesSummaryItem[] >;

    items = this.fireStore.collection<NumSharesSummaryItem>("/numsharessummary/Bursa/27-Feb-2019").valueChanges();

    items.subscribe( arr => {

      this.equitiesTotalShareChangeDataSource.data = arr;

    } );

    // Gets the ownership summary

    let ownershipItems: Observable <OwnershipSummaryItem[] >;

    // /ownershipsummary/Bursa/27-Feb-2019/udAqWtQYrqzxxQlsyLPI
    ownershipItems = this.fireStore.collection<OwnershipSummaryItem>("/ownershipsummary/Bursa/27-Feb-2019").valueChanges();

    ownershipItems.subscribe( arr => {
      this.ownershipSummaryDataSource.data = arr;
    });
  }

  selectRow(row)
  {
     console.log('Row selected is ' + row.Symbol);
  }

}
