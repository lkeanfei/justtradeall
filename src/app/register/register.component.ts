import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../shared/security/auth.service';
import {concatMap} from 'rxjs/operators';
import {PreviousRouteServiceService} from "../shared/previous-route-service.service";
import {Router} from "@angular/router";
import {HttpService} from "../shared/httpservice.service";
import {User} from "../shared/security/user";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  signupFailed = false;
  signupFailedMessage = "";




  constructor(private fb:FormBuilder , private authService: AuthService ,
              private httpService: HttpService,
              private router : Router, private prevRouteService: PreviousRouteServiceService) {}


  ngOnInit() {
  }

  signUp()
  {
    // Check if username exists first

    this.authService.checkUsername();

    this.authService.signUp( this.emailFormControl.value , this.passwordFormControl.value)
      .subscribe(
        () => {

          this.signupFailed = false;
          this.signupFailedMessage = ""
        } ,
        (err: Error) => {

          this.signupFailed = true;
          this.signupFailedMessage = err.message;
        }
      );
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
