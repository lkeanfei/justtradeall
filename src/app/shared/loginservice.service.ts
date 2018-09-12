import {Component, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AuthService} from "./security/auth.service";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class LoginService {

  constructor(private loginDialog: MatDialog) {}

  openDialog() {

     this.loginDialog.open( DialogContentExampleDialog ,{ width: '70vw'} );

  }


}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'loginDialogActual.html',
  styleUrls: ['login.dialog.css']
})
export class DialogContentExampleDialog {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('');

  constructor (private authService: AuthService) {}
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
