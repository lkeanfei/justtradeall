import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {HttpService} from '../shared/httpservice.service';
import {MatSort, MatTableDataSource, Sort} from '@angular/material';
import { AngularFirestore , AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from "rxjs";
import * as moment from 'moment';

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
  Symbol: string;
  TradeDate: string;
  NumSharesDiff: number;
  PercentageDiff: number;

}

export interface OwnershipSummaryItem {
  Symbol: string;
  Code: string;
  SharesAcquired : number;
  PercentageSharesAcquired : number;
  SharesDisposed : number;
  PercentageSharesDisposed : number;
}

export interface TradeSummarySignalItem {
  Symbol: string;
  MostBuyUpPrice: number;
  MostSellDownPrice: number;
}

export interface TradeSummarySignalDetailsItem {
  Price: number ;
  Trades: number;
  BuyUp: number;
  AverageBuyUpTrades: number;
  Selldown: number;
  AverageSellDownTrades: number;
}

export interface TradingDay {
  date: string;
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
  tradeSummarySignalDataSource: any;
  tradeSummarySignalDetailsDataSource: any;

  companyColumns = ['id', 'name', 'shares', 'percentage'];
  holderColumns = ['id', 'holder' , 'name' ,  'shares' , 'percentage'];
  equitiesTotalShareChangeColumns = [ 'Symbol' , 'NumSharesDiff'  , 'PercentageDiff'];
  ownershipSummaryColumns = ['Symbol' , 'SharesAcquired' , 'PercentageSharesAcquired' , 'SharesDisposed' ,'PercentageSharesDisposed'];
  tradeSummarySignalColumns = ['Symbol' , 'MostBuyUpPrice' , 'MostSellDownPrice'];
  tradeSummarySignalDetailsColumns = [ 'Price' , 'Trades' , 'BuyUp' , 'AverageBuyUpTrades' , 'Selldown' , 'AverageSellDownTrades'];


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

  tradeSymbolWidth = 20;
  mostBuyUpWidth = 40;
  mostSellDownWidth = 40;

  tradeSummaryDetailSymbol = '';

  //Trade Symmary signal details table
  priceWidth = 10;
  tradesWidth = 10;
  buyUpWidth = 20;
  averageBuyUpTradesWidth = 20;
  sellDownWidth = 20;
  averageSellDownTradesWidth = 20;

  companySelectedYear = '2017';
  shareHolderSelectedYear = '2017';
  shareHolderTableLoading: boolean;
  startSearchingShareHolders: boolean;

  mostBuyUpPrice: number;
  mostSellDownPrice: number;

  // Styling for the loading spinner
  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  // Binding for drop down selections
  tradingDayListObservable : Observable<TradingDay[]>;
  tradingDayList: TradingDay[];
  aggregateDays = [1,2,4,8];
  selectedDate = '';
  selectedAggregateDays = 1;

  @ViewChild('totalshare') equitiesTotalShareSort: MatSort;
  @ViewChild('ownership') ownershipSummarySort: MatSort;
  @ViewChild('tradesummarysignal') tradesummarysignalSort: MatSort;
  @ViewChild('tradesummarysignaldetails') tradeSummarySignalDetailsSort: MatSort;



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
    this.tradeSummarySignalDataSource = new MatTableDataSource<TradeSummarySignalItem>();
    this.tradeSummarySignalDetailsDataSource =  new MatTableDataSource<TradeSummarySignalDetailsItem>();

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
    this.tradeSummarySignalDataSource.sort = this.tradesummarysignalSort;
    this.tradeSummarySignalDetailsDataSource.sort = this.tradeSummarySignalDetailsSort;

    setTimeout(() => {
      this.ownershipSummaryDataSource.sort = this.ownershipSummarySort;
    });


    // Fetch the NumShares Summary from firestore
    let items: Observable < NumSharesSummaryItem[] >;

    items = this.fireStore.collection<NumSharesSummaryItem>("/numsharessummary/Bursa/27-Feb-2019").valueChanges();

    items.subscribe( arr => {

      this.equitiesTotalShareChangeDataSource.data = arr;

    } );

    // Gets the trading day list
    this.tradingDayListObservable = this.fireStore.collection<TradingDay>("/TradingDays").valueChanges();

    this.tradingDayListObservable.subscribe(arr => {
       arr.sort(function(a, b){
         if(a.date > b.date)
           return -1;
         else {
           return 1;
         }
       });

       this.tradingDayList = arr;

       // Gets the latest day
       console.log('Latest day is ' + arr[0].date);
       this.getTradeSummarySignals(moment(arr[0].date).format('DD-MMM-YYYY') , 1);
    });

    // Gets the ownership summary

    let ownershipItems: Observable <OwnershipSummaryItem[] >;

    // /ownershipsummary/Bursa/27-Feb-2019/udAqWtQYrqzxxQlsyLPI
    ownershipItems = this.fireStore.collection<OwnershipSummaryItem>("/ownershipsummary/Bursa/27-Feb-2019").valueChanges();

    ownershipItems.subscribe( arr => {
      this.ownershipSummaryDataSource.data = arr;
    });


    // Fetch the Trade Summary Signal from  Firestore


  }

  getTradeSummarySignals(dateStr: string, aggregateDays: number)
  {
    let tradeSummarySignalItems: Observable<TradeSummarySignalItem[]>;
    let aggregateDayString = 'Aggregate_' + aggregateDays;

    tradeSummarySignalItems = this.fireStore.collection<TradeSummarySignalItem>("/TradeSummarySignal/Bursa/"+ dateStr  +"/"+ aggregateDayString  +"/List").valueChanges();

    tradeSummarySignalItems.subscribe(arr=> {
      this.tradeSummarySignalDataSource.data = arr;
    });

  }

  selectRow(row)
  {
     console.log('Row selected is ' + row.Symbol);
  }

  viewTradeSummary() {

    console.log(moment(this.selectedDate).format('DD-MMM-YYYY'));
    console.log(this.selectedAggregateDays);

    this.getTradeSummarySignals(moment(this.selectedDate).format('DD-MMM-YYYY') , this.selectedAggregateDays);

  }

  sortData(sort: Sort) {

    let column = sort.active;
console.log(sort.active);
   console.log('Direction ' + sort.direction );



    function compare(a,b)  {

      let val = -1;
      if(sort.direction == 'desc')
      {
        val = 1;
      }
      if (a[column] < b[column])
        return val;
      if (a[column] > b[column])
        return val*(-1);
      return 0;
    }

    let arr =  this.tradeSummarySignalDetailsDataSource.data;

    arr.sort(compare);

    this.tradeSummarySignalDetailsDataSource.data = arr;

    /*
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'calories': return compare(a.calories, b.calories, isAsc);
        case 'fat': return compare(a.fat, b.fat, isAsc);
        case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });

    */
  }

  selectTradeSummarySignalRow(row)
  {
    this.tradeSummaryDetailSymbol = row.Symbol;
    this.mostBuyUpPrice = row.MostBuyUpPrice;
    this.mostSellDownPrice = row.MostSellDownPrice;
    console.log('Trade Summary signal row is ' + row.Symbol);

    let dateStr = moment(this.selectedDate).format('DD-MMM-YYYY');
    let aggregateStr = 'Aggregate_' + this.selectedAggregateDays;


    let tradeSummarySignalDetailItems: Observable<TradeSummarySignalDetailsItem[]>;
    let path = '/TradeSummarySignal/Bursa/' + dateStr  +'/' + aggregateStr +'/List/' +  row.Symbol +'/List';

    tradeSummarySignalDetailItems = this.fireStore.collection<TradeSummarySignalDetailsItem>(path).valueChanges();

    tradeSummarySignalDetailItems.subscribe(arr=> {

      function compare(a,b) {
        if (a.Price < b.Price)
          return 1;
        if (a.Price > b.Price)
          return -1;
        return 0;
      }

      arr.sort(compare);

      this.tradeSummarySignalDetailsDataSource.data = arr;
    });

  }

}
