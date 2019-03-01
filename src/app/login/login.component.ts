import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder , FormGroup , FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router} from '@angular/router';
import {AuthService} from '../shared/security/auth.service';
import {PreviousRouteServiceService} from "../shared/previous-route-service.service";
import {Observable} from "rxjs/index";
import {concatMap} from 'rxjs/operators';
import {HttpService} from "../shared/httpservice.service";
import {User} from "../shared/security/user";
import {Store} from '@ngrx/store';
import {Ingredient} from "../shared/Ingredient.model";
import * as AuthActions from '../store/auth.actions';
import {isUndefined} from "util";
import {UserModel} from "../shared/security/user.model";


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {

  bLoginFailed = false;
  constructor() {

  }


  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && this.bLoginFailed && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  usernameFormControl = new FormControl('' , [
    Validators.required,
    Validators.minLength(8)
  ]);
  bLoginFailed = false;
  // shoppingListState: Observable<{ingredients: Ingredient[]}>;
  authState: Observable<{user: UserModel}>;
  idtoken: string;
  matcher = new MyErrorStateMatcher();

  constructor(private fb:FormBuilder , private authService: AuthService ,
              private httpService: HttpService, private store: Store<{authUser: {user: UserModel }}>,
              private router : Router, private prevRouteService: PreviousRouteServiceService) {

  }


  testLogin() {
    const newUser = new UserModel("New1" , true);
    this.store.dispatch(new AuthActions.UpdateUser(newUser));
  }

  testLogout() {

    this.store.dispatch(new AuthActions.DeleteUser());
  }


  ngOnInit() {

    this.authState = this.store.select('authUser');

    this.authState.subscribe( obj => {
       if ( ! isUndefined(obj)) {
         //console.log('adasdad ');
         //console.log(obj);
       }
    });

  }



  login() {


    //console.log("email: " + this.emailFormControl.value);
    //console.log("password: " + this.passwordFormControl.value);
    this.authService.login(this.emailFormControl.value ,  this.passwordFormControl.value)
      .subscribe(
        () => {


          this.bLoginFailed = false;
          this.router.navigate(['/home']);
        },
        () => {
          this.bLoginFailed = true;

          // login failed
          localStorage.removeItem('id');
        }

      );

  }

  test() {
    this.httpService.verifySession().subscribe( data=> {

    });
  }

  processLoginObservables( obs: Observable<Object> ) {

    let user = AuthService.UNKNOWN_USER;
    obs.subscribe(
      (val: string) => {

        console.log('Status is ' + val['status']);
        if (val['status'] == 'success') {
          user = new User(val['user'] , val['email'] , val['photourl']);
          //this.authService.triggerAuthEvent(user);
          this.authService.triggerAuthReplayEvent(user);
          let prevUrl = this.prevRouteService.getPreviousUrl()

          if(prevUrl.includes('login') || prevUrl.includes('register')) {
            prevUrl = '/home';
          }

          const newUser = new UserModel('' , true);
          this.store.dispatch(new AuthActions.UpdateUser(newUser));





          this.router.navigate([prevUrl]);
        }


      },
      (err) => {

        //this.authService.triggerAuthEvent(user);
        this.authService.triggerAuthReplayEvent(user);

      }
    )

  }

  /*Login with username and password*/
  loginWithUsernamePassword() {
    let email = this.emailFormControl.value;
    let password = this.passwordFormControl.value;

    const obs = this.authService.login(email, password).pipe(
      concatMap( () => this.authService.getIdToken() ),
      concatMap(  (idToken : string) => {
        this.idtoken = idToken;
        return this.httpService.postIdToSessionLogin(idToken)})
    );

    this.processLoginObservables(obs);

  }


  loginGoogle() {

    const obs = this.authService.loginGoogle().pipe(
      concatMap( () => this.authService.getIdToken() ),
      concatMap(  (idToken : string) => this.httpService.postIdToSessionLogin(idToken))
    );

    this.processLoginObservables(obs);
  }

  loginFacebook() {

    const obs = this.authService.loginFacebook().pipe(
      concatMap( () => this.authService.getIdToken() ),
      concatMap(  (idToken : string) => this.httpService.postIdToSessionLogin(idToken))
    );

    this.processLoginObservables(obs);

  }
  //
  // loginTwitter() {
  //
  //   this.authService.loginTwitter()
  //     .subscribe(
  //       () => {
  //         console.log('Twitter login successful!');
  //       }
  //       ,
  //       () => {
  //         console.log('Twitter login failed!');
  //       }
  //     );
  //
  // }



}
