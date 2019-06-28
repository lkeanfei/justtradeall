import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {BehaviorSubject, Observable} from 'rxjs';
import { map , startWith , debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {HttpService} from '../shared/httpservice.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/security/auth.service';
import {User} from '../shared/security/user';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => {

        return  result.matches;
      })
    );

  showSearchButton = true;
  showMobileSearchButton = false;
  photourl: string;
  userName: string;
  myControl = new FormControl();
  handsetControl = new FormControl();
  filteredOptions: Observable<string[]>;
  mobileFilteredOptions: Observable<string[]>;
  options: string[] = [];
  isLoggedIn: Observable<boolean>;
  loginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false);
  layoutClass: string;
  currentHandsetState : boolean;
  model: any;
  states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  @ViewChild('mobileCounterInput') mobileCounterInput: ElementRef;


  constructor(private breakpointObserver: BreakpointObserver ,
              private router: Router, private authService: AuthService,
              private httpService: HttpService) {
    this.isLoggedIn = this.loginSubject.asObservable();

    this.isHandset$.subscribe( val => {
      //console.log('This is handset ' + val);
      this.currentHandsetState = val;
      if (val) {
        // For mobile handsets
        this.layoutClass = "column"
      }
      else {
        // for bigger displays

        this.layoutClass = 'row';
      }
    });
  }

  ngOnInit() {

    // Verify the user
    this.authService.verifyUser().subscribe( (user:User) => {
      if (user === AuthService.UNKNOWN_USER ) {
        this.loginSubject.next(false);
      } else {
        this.loginSubject.next(true);
        this.userName = user['name'];
        this.photourl = user['photourl'];
        //console.log('User is verfied! ' + this.userName);

      }
    });

    this.authService.getAuthReplayObservable().subscribe( (user: User) => {
      if (user === AuthService.UNKNOWN_USER ) {

        this.loginSubject.next(false);
      } else {

        this.loginSubject.next(true);
        this.userName = user['name'];
        this.photourl = user['photourl'];
        //console.log('User is authenticated! ' + this.userName);
        // console.log('**** known user ' + user['name']);
        // console.log('**** known user ' + user['email']);
        // console.log('**** know user ' + user['photourl']);

      }
    })

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

    this.mobileFilteredOptions = this.handsetControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


  activateSearchInput() {
    this.showSearchButton = false;


  }

  toggleMobileSearchInput() {
     console.log("Toggling Mobile  the search " + this.showMobileSearchButton)
    this.showMobileSearchButton = !this.showMobileSearchButton;

    if(this.showMobileSearchButton) {
      setTimeout(() => {
        this.mobileCounterInput.nativeElement.focus();
      } , 300);
    }
  }

  focusOutMobileSearchInput() {
    this.showMobileSearchButton = false;
  }

  selectMobileCounter(counter: string) {

    this.handsetControl.setValue(counter);
    // console.log('Selected the counter ' + counter)
    this.mobileNavigateSecurity();
  }

  focusOutSearchInput() {
    this.showSearchButton = true;
  }

  logout() {
    // Set logged in to False
    this.authService.logout();
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

  mobileNavigateSecurity() {
    const fullSecStr = this.handsetControl.value;
    const tokens = fullSecStr.split(' ');
    this.router.navigate(['/security' , tokens[0] + '.MY'] );
  }

  navigateToScreener() {
     this.router.navigate( ['/screener']);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  }
