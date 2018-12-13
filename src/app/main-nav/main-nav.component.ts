import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map , startWith } from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {HttpService} from "../shared/httpservice.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  showSearchButton = true;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[] = [];

  constructor(private breakpointObserver: BreakpointObserver ,
              private router: Router,
              private httpService: HttpService) {
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

  activateSearchInput() {
    this.showSearchButton = false;
  }

  focusOutSearchInput() {
    this.showSearchButton = true;
  }

  selectCounter(counter: string) {

    this.myControl.setValue(counter);
    // console.log('Selected the counter ' + counter)
    this.navigateSecurity();
  }


  navigateSecurity() {
    // console.log('Navigate Security is ' + this.myControl.value);
    const fullSecStr = this.myControl.value;
    const tokens = fullSecStr.split(' ');
    this.router.navigate(['/security' , tokens[0] + '.MY'] );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  }
