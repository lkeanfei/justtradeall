import {Observable} from 'rxjs/index';

export class Market {
  constructor(public name: string, public selectedDate,  public dateList: Observable<Object[]>) {}
}
