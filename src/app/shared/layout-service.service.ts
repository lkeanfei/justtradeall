import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable} from 'rxjs';
import { map ,shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LayoutServiceService {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches ),
      shareReplay(1)
    );

  constructor(private breakpointObserver: BreakpointObserver)  {};

  getIsHandSetObservable() : Observable<boolean> {
    return this.isHandset$;
  }
}
