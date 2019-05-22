import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()

export class DataService {
  fundamentalsData$:Observable<any>;
  technicalsData$: Observable<any>;
  top30Data$: Observable<any>;
  overviewDictData$ : Observable<any>;
  balanceSheetData$ : Observable<any>;
  profitLossData$:  Observable<any>;
  cashFlowData$ : Observable<any>;
  quarterliesData$ : Observable<any>

  private overviewDictDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private fundamentalsDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private technicalsDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private top30DataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private balanceSheetDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private profitLossDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private cashFlowDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private quarterliesDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});

  constructor() {
    this.overviewDictData$ = this.overviewDictDataSubject.asObservable();
    this.fundamentalsData$ = this.fundamentalsDataSubject.asObservable();
    this.technicalsData$ = this.technicalsDataSubject.asObservable();
    this.top30Data$ = this.top30DataSubject.asObservable();
    this.balanceSheetData$ = this.balanceSheetDataSubject.asObservable();
    this.profitLossData$ = this.profitLossDataSubject.asObservable();
    this.cashFlowData$ = this.cashFlowDataSubject.asObservable();
    this.quarterliesData$ = this.quarterliesDataSubject.asObservable();
  }

  public setBalanceSheetData(data) {
     this.balanceSheetDataSubject.next(data);
  }

  public setProfitLossData(data) {
     this.profitLossDataSubject.next(data);
  }

  public setCashFlowData(data) {
    this.cashFlowDataSubject.next(data);
  }

  public setQuarterliesData(data) {
    this.quarterliesDataSubject.next(data);
  }

  public setOverviewDictData(data) {
    this.overviewDictDataSubject.next(data);
  }

  public setFundamentalsData(data) {
    this.fundamentalsDataSubject.next(data);
  }

  public setTechnicalsData(data) {
    this.technicalsDataSubject.next(data);
  }

  public setTop30Data(data) {
    this.top30DataSubject.next(data);
  }

}