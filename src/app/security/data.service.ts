import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()

export class DataService {
  fundamentalsData$:Observable<any>;
  technicalsData$: Observable<any>;
  top30Data$: Observable<any>;
  overviewDictData$ : Observable<any>;
  annualData$ : Observable<any>;
  quarterliesData$ : Observable<any>;
  indicatorsData$: Observable<any>;
  candlePatternsData$: Observable<any>;
  forecastData$: Observable<any>;
  forecastAccuracyData$: Observable<any>;

  private overviewDictDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private fundamentalsDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private technicalsDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private top30DataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private annualDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private quarterliesDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private indicatorsDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private candlesPatternDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private forevastDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private forevastAccuracyDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});

  constructor() {
    this.overviewDictData$ = this.overviewDictDataSubject.asObservable();
    this.fundamentalsData$ = this.fundamentalsDataSubject.asObservable();
    this.technicalsData$ = this.technicalsDataSubject.asObservable();
    this.top30Data$ = this.top30DataSubject.asObservable();
    this.annualData$ = this.annualDataSubject.asObservable();
    this.quarterliesData$ = this.quarterliesDataSubject.asObservable();
    this.indicatorsData$ = this.indicatorsDataSubject.asObservable();
    this.candlePatternsData$ = this.candlesPatternDataSubject.asObservable();
    this.forecastData$ = this.forevastDataSubject.asObservable();
    this.forecastAccuracyData$ = this.forevastAccuracyDataSubject.asObservable();
  }

  /*
  public setBalanceSheetData(data) {
     this.balanceSheetDataSubject.next(data);
  }

  public setProfitLossData(data) {
     this.profitLossDataSubject.next(data);
  }

  public setCashFlowData(data) {
    this.cashFlowDataSubject.next(data);
  }
  */

  public setForecastAccuracyData(data) {
    this.forevastAccuracyDataSubject.next(data);
  }

  public setForecastData(data) {
    this.forevastDataSubject.next(data);
  }

  public setAnnualData(data) {
    this.annualDataSubject.next(data);
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

  public setIndicatorsData(data) {
    this.indicatorsDataSubject.next(data);
  }

  public setCandlesData(data) {
    this.candlesPatternDataSubject.next(data);
  }

}
