import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()

export class DataService {
  fundamentalsData$:Observable<any>;
  technicalsData$: Observable<any>;
  top30Data$: Observable<any>;

  private fundamentalsDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private technicalsDataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});
  private top30DataSubject: BehaviorSubject<any> = new BehaviorSubject({'ready' : false});

  constructor() {

    this.fundamentalsData$ = this.fundamentalsDataSubject.asObservable();
    this.technicalsData$ = this.technicalsDataSubject.asObservable();
    this.top30Data$ = this.top30DataSubject.asObservable();
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
