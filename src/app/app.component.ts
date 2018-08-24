import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  marketTitles = ['Market Summary'];
  analysisTitles = ['Shareholdings' , 'Stock Quotes']
  secondaryTitles = [ '1' ,'222' , '333444'];

  activateMarket() {
    console.log("Activate Market!");
    this.secondaryTitles = [];
    for( const data of this.marketTitles) {
      this.secondaryTitles.push(data);
    }

  }

  activateAnalysis() {
    console.log('Activate Analysis');
    this.secondaryTitles = [];
    for( const data of this.analysisTitles) {
      this.secondaryTitles.push(data);
    }
  }

  testClick(param: string) {
    console.log('param is ' + param);
  }

}
