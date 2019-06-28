import { Component, OnInit } from '@angular/core';
import {HttpService} from "../shared/httpservice.service";

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  activeCounters : any;
  AEList = [];
  FJList = [];
  KOList = [];
  PTList = [];
  UZList = [];
  isLoading = true;

  color = 'primary';
  mode = 'indeterminate';
  value = 50;



  constructor(private httpService: HttpService) { }

  ngOnInit() {

    for(let c = 0; c < 5 ; c++ ) {
       let char = String.fromCharCode(65 + c);
       this.AEList.push(char);
    }

    for(let c = 6; c < 10 ; c++ ) {
      let char = String.fromCharCode(65 + c);
      this.FJList.push(char);
    }

    for(let c = 10; c < 15 ; c++ ) {
      let char = String.fromCharCode(65 + c);
      this.KOList.push(char);
    }

    for(let c = 15; c < 20 ; c++ ) {
      let char = String.fromCharCode(65 + c);
      this.PTList.push(char);
    }

    for(let c = 20; c < 26 ; c++ ) {
      let char = String.fromCharCode(65 + c);
      this.UZList.push(char);
    }

    this.httpService.getActiveCounters().subscribe(data => {

        this.activeCounters = data['results'];
        this.isLoading = false;
    });
  }

}
