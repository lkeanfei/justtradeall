import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../shared/httpservice.service";
import {Observable} from "rxjs/index";
import {concatMap } from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-secshareholdings',
  templateUrl: './secshareholdings.component.html',
  styleUrls: ['./secshareholdings.component.css']
})
export class SecshareholdingsComponent implements OnInit {


  showLogin: boolean;

  constructor(private route: ActivatedRoute ,private httpService: HttpService) {

    const theSub = this.route.params.pipe(
      concatMap( prms => this.routeChangedDetected(prms))
    );

    theSub.subscribe( res => {

      const dataList = []
      let status = res['status']
      console.log('Sec shareholdings Status is ' + status);

      if (status == 'login') {
        this.showLogin = true;
      } else {
        this.showLogin = false;
        console.log(res['top30year']);
        console.log(res['distlist']);
        console.log(res['top30list']);

      }
    })

  }

  ngOnInit() {
  }

  routeChangedDetected( prms) : Observable<any> {

    return this.httpService.getHoldingsDistAndTop30View(prms['fullid']);
  }

}
