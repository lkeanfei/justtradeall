import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
 import { BehaviorSubject} from 'rxjs/index';
import { Market } from '../shared/market.model';
import {AngularFireDatabase} from 'angularfire2/database';
import _ from 'lodash';
import * as Rx from 'rxjs';
import * as moment from 'moment';
import {merge} from 'rxjs';
import {map } from 'rxjs/operators';
import {DataSource} from '@angular/cdk/collections';
import {AuthService} from '../shared/security/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  ELEMENT_DATA: Element[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  ];

  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  dataSource = new MatTableDataSource();
  exampleDatabase = new ExampleDatabase();
  data: Market;
  searchField: FormControl;
  subject: BehaviorSubject<string>;
  marketList: Array<string>;



  constructor(db: AngularFireDatabase , private authService: AuthService) {

    this.marketList = new Array();
    this.marketList.push("Bursa");
    this.data = new Market( 'Bursa', '' , new Observable());
    this.subject = new Rx.BehaviorSubject(this.data.selectedDate);

    this.authService.loginChanged.subscribe(
      (isLoggedIn: Boolean) => {
        console.log('Inside home component ' + isLoggedIn);
      }
    );

    const subscription = this.subject.subscribe(
      (dateSelected:string ) => {
        console.log('Next date selected: ' + dateSelected);

        // const momentSelected: moment.Moment = moment(dateSelected , 'DD-MMM-YYYY');
        //
        // for( let localMarketHighList of this.marketSummaryService.arrayMarketHighList)
        // {
        //
        //   console.log("Inside subscribe date loop :" + localMarketHighList.getDate() );
        //   if (localMarketHighList.getDate() ===  momentSelected.format('YYYY-MM-DD')) {
        //     this.highListStockItems = localMarketHighList.getHighListItems();
        //   }
        // }
        //
        // for( let localMarketLowList of this.marketSummaryService.arrayMarketLowList)
        // {
        //   if (localMarketLowList.getDate() === momentSelected.format('YYYY-MM-DD')) {
        //     this.lowListStockItems = localMarketLowList.getLowListItems();
        //   }
        // }







      } ,
      (err) => {} ,
      () => { console.log('Completed'); }
    );

    // subscribe to the trading day
    db.list('/tradingdays').valueChanges().subscribe((data: Array<Object>) => {
      const itemList: Array<Object> = new Array();

      for ( const tradingDayObj of data) {
        console.log(tradingDayObj);
        itemList.push(tradingDayObj);
      }

      const maxDate =  _.maxBy(itemList);
      this.data.selectedDate = maxDate;
      // to watch for changes in date or country selection

      console.log('max date ' + maxDate);
      const myMoment: moment.Moment =  moment(maxDate , 'YYYY-MM-DD');
      this.subject.next(myMoment.format('DD-MMM-YYYY'));
    });
    // map(db.list('/tradingdays').valueChanges())
    // this.data.dateList = db.list('/tradingdays').valueChanges().(
    //   (data: Array<Object>) => {
    //     const itemList: Array<Object> = new Array();
    //
    //     for ( let tradingDayObj of data) {
    //       console.log(tradingDayObj);
    //       itemList.push(tradingDayObj);
    //     }
    //
    //     const maxDate =  _.maxBy(itemList);
    //     this.data.selectedDate = maxDate;
    //     // to watch for changes in date or country selection
    //
    //     console.log('max date ' + maxDate);
    //     let myMoment : moment.Moment =  moment(maxDate , 'YYYY-MM-DD');
    //     this.subject.next(myMoment.format('DD-MMM-YYYY'));
    //
    //     return itemList;
    //   }
    //
    // );

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    // this.dataSource.filter = filterValue;

  }

  addElement() {
    this.exampleDatabase.addUser();
    //  this.exampleDatabase.addElement( 21 );

  }

  onFormSubmit()  {
    console.log('Submitted! ' + this.searchField.value);
  }



  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  ngOnInit() {
    this.searchField = new FormControl();
  }

}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }

  constructor() {
    // Fill up the database with 100 users.
    for (let i = 0; i < 100; i++) { this.addUser(); }
  }

  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */


export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

