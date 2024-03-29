import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs/index";
import {FormControl} from "@angular/forms";
import {map, startWith} from 'rxjs/operators';
import {HttpService} from "./shared/httpservice.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "./shared/loginservice.service";
import {AuthService} from "./shared/security/auth.service";
import {User} from "./shared/security/user";
import {Store} from '@ngrx/store';
import {Ingredient} from "./shared/Ingredient.model";
import * as AuthActions from './store/auth.actions';
import {isUndefined} from "util";
import {UserModel} from "./shared/security/user.model";

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
  isLoggedIn: Observable<boolean>;
  loginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false);
  photourl: string;
  userName: string;
  showSearchButton = true;

  authState: Observable<{ user: UserModel}>;

  filteredOptions: Observable<string[]>;

  constructor(private loginService: LoginService,private httpService : HttpService ,
              private store: Store<{authUser: {user: UserModel }}>,
              private route: ActivatedRoute , private authService: AuthService,
              private router: Router) {

    this.isLoggedIn = this.loginSubject.asObservable();
  }

  ngOnInit() {

    // Subscribe to store
    // this.shoppingListState = this.store.select('shoppingList')
    //
    // this.shoppingListState.subscribe( obj => {
    //   if ( ! isUndefined(obj)) {
    //     console.log('inside app componet ');
    //     console.log(obj);
    //     sessionStorage.setItem('_auth' , JSON.stringify(obj))
    //   }
    // });


    // Verify the user
    /*
    this.authService.verifyUser().subscribe( (user:User) => {
       if (user === AuthService.UNKNOWN_USER ) {
           //console.log('App unknown user!!')
          this.loginSubject.next(false)
           this.store.dispatch(new AuthActions.DeleteUser())
       } else {
         this.loginSubject.next(true)
         this.userName = user['name']
         this.photourl = user['photourl']
         const newUser = new UserModel('' , true);
         this.store.dispatch(new AuthActions.UpdateUser(newUser))
          // console.log('**** known user ' + user['name']);
          // console.log('**** known user ' + user['email']);
          // console.log('**** know user ' + user['photourl']);

       }
    });

    this.authService.getAuthReplayObservable().subscribe( (user: User) => {
      if (user === AuthService.UNKNOWN_USER ) {

        this.loginSubject.next(false)
      } else {

        this.loginSubject.next(true)
        this.userName = user['name']
        this.photourl = user['photourl']
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
    */

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

  activateSearchInput() {
    this.showSearchButton = false;
  }

  focusOutSearchInput() {
    this.showSearchButton = true;
  }

  openDialog() {
    this.loginService.openDialog();
  }

  logout() {
      // Set logged in to False
    this.authService.logout();
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
