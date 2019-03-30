import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../shared/security/auth.service';
import {concatMap} from 'rxjs/operators';
import {PreviousRouteServiceService} from "../shared/previous-route-service.service";
import {Router} from "@angular/router";
import {HttpService} from "../shared/httpservice.service";
import {User} from "../shared/security/user";
import {Observable} from "rxjs/index";
import {ErrorStateMatcher} from "@angular/material";

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

  regForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private fb:FormBuilder , private authService: AuthService ,
              private httpService: HttpService,
              private router : Router, private prevRouteService: PreviousRouteServiceService) {
    this.regForm = this.fb.group({
      email: ['' , [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8) , Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }


  ngOnInit() {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls["password"].value;
    let confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true }
  }

  signUp()
  {
    // Check if username exists first
    // this.authService.checkUsername();
    let userName = this.regForm.controls['email'].value;
    let pwd = this.regForm.controls['password'].value;


    // Only proceeds with sign up when no errors
    if( this.regForm.controls['email'].errors == null && this.regForm.controls['password'].errors ==null ) {
      this.authService.signUp( userName , pwd)
        .subscribe(
          () => {

            this.signupFailed = false;
            this.signupFailedMessage = ""
            console.log('Sign up passed!');

          } ,
          (err) => {


            this.signupFailed = true;
            this.signupFailedMessage = err.message;
            console.log('Sign up failed ' + err.message);
          }
        );

    }


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

        this.router.navigate([prevUrl]);
      },
      (err) => {

        this.authService.triggerAuthEvent(user);

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


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
