import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder , FormGroup , FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import {AuthService} from '../shared/security/auth.service';

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

  passwordFormControl = new FormControl('');
  bLoginFailed = false;

  matcher = new MyErrorStateMatcher();

  constructor(private fb:FormBuilder , private authService: AuthService,
              private router: Router) { }


  ngOnInit() {
    let id: string;
    id = localStorage.getItem('id');
    if(id == null){
      console.log('User not yet logged in. id is null la!');
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

  loginGoogle() {

    this.authService.loginGoogle()
      .subscribe(
        () => {
          console.log('Google login successful!');
        }
        ,
        () => {
          console.log('Error Google login!');
        });
  }

  loginFacebook() {

    this.authService.loginFacebook()
      .subscribe(
        () => {
          console.log('Facebook login successful!');
        }
        ,
        () => {
          console.log('Facebook login failed!');
        }
      );

  }

  loginTwitter() {

    this.authService.loginTwitter()
      .subscribe(
        () => {
          console.log('Twitter login successful!');
        }
        ,
        () => {
          console.log('Twitter login failed!');
        }
      );

  }



}
