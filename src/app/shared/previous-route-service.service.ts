import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteServiceService {

  private previousUrl: string;
  private currentUrl: string;
  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // console.log('Previous url ' + this.previousUrl);
        // console.log('Current url ' + this.currentUrl);
        // this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
      ;
    });
  }

    public getPreviousUrl() {
      return this.currentUrl;
    }
}
