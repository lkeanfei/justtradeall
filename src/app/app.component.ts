import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {FormControl} from "@angular/forms";
import {map, startWith} from 'rxjs/operators';
import {HttpService} from "./shared/httpservice.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "./shared/loginservice.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  homeTitles = [];
  analysisTitles = ['Shareholdings' ]
  marketTitles = [ 'Market Summary'];
  secondaryTitles = [];
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(private loginService: LoginService,private httpService : HttpService , private route: ActivatedRoute , private router: Router) {}

  ngOnInit() {

    this.httpService.getAllCounters().subscribe( (counterList: Array<any> )=> {
       for(const counter of counterList) {

          this.options.push( counter['symbol'] + ' ' + counter['name']);
       }

    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  activateHome() {


    this.secondaryTitles = [];
    for( const data of this.homeTitles) {
      this.secondaryTitles.push(data);
    }

    this.router.navigate(['/']);

  }

  activateMarket() {
    this.secondaryTitles = []
    for( const data of this.marketTitles) {
      this.secondaryTitles.push(data);
    }

  }

  openDialog() {
    this.loginService.openDialog();
  }

  activateAnalysis() {

    this.secondaryTitles = [];
    for( const data of this.analysisTitles) {
      this.secondaryTitles.push(data);
    }

    this.router.navigate(['/shareholdings'])
  }

  testClick(param: string) {

  }

  selectCounter(counter: string) {

    // this.myControl.setValue(counter);
  }

  navigateSecurity() {
     // console.log('Security is ' + this.myControl.value);
    const fullSecStr = this.myControl.value;
    const tokens = fullSecStr.split(' ');
    this.router.navigate(['/security' , tokens[0] + '.MY'] );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
