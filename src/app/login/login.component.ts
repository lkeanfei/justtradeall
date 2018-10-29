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

  matcher = new MyErrorStateMatcher();

  constructor(private fb:FormBuilder , private authService: AuthService ,
              private httpService: HttpService,
              private router : Router, private prevRouteService: PreviousRouteServiceService) {

  }


  ngOnInit() {
    let id: string;
    id = localStorage.getItem('id');
    if(id == null){
      console.log('User not yet loggd in. id is null la!');
    } else {
      // User already logged in
      // redirect to home page
      // this.router.navigate(['/home']);
      // console.log('id is ' + id);
    }
  }



  login() {


    console.log("email: " + this.emailFormControl.value);
    console.log("password: " + this.passwordFormControl.value);
    this.authService.login(this.emailFormControl.value ,  this.passwordFormControl.value)
      .subscribe(
        () => {


          this.bLoginFailed = false;
          this.router.navigate(['/home']);
        },
        () => {
          this.bLoginFailed = true;
          console.log("error loging!");
          // login failed
          localStorage.removeItem('id');
        }

      );

  }

  test() {
    this.httpService.verifySession().subscribe( data=> {
      console.log('Returned from verify!');
      console.log(data);
    });
  }

  processLoginObservables( obs: Observable<Object> ) {

    let user = AuthService.UNKNOWN_USER;
    obs.subscribe(
      (val: string) => {

        user = new User(val['user'] , val['email'] , val['photourl']);
        this.authService.triggerAuthEvent(user);
        let prevUrl = this.prevRouteService.getPreviousUrl()

        if(prevUrl.includes('login') || prevUrl.includes('register')) {
          prevUrl = '/home';
        }
        console.log('Navigating to ' + prevUrl);
        this.router.navigate([prevUrl]);
      },
      (err) => {
        console.log('Error login google!');
        this.authService.triggerAuthEvent(user);
        console.log(err);
      }
    )

  }

  /*Login with username and password*/
  loginWithUsernamePassword() {
    let email = this.emailFormControl.value;
    let password = this.passwordFormControl.value;
    console.log("email: " + email);
    console.log("password: " + password);

    const obs = this.authService.login(email, password).pipe(
      concatMap( () => this.authService.getIdToken() ),
      concatMap(  (idToken : string) => this.httpService.postIdToSessionLogin(idToken))
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
