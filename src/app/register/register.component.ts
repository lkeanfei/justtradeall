import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../shared/security/auth.service';

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




  constructor(private authService:AuthService ) { }

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
      // .subscribe(
      //   () => {
      //     console.log('Facebook login successful!');
      //   }
      //   ,
      //   () => {
      //     console.log('Facebook login failed!');
      //   }
      // );

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
