import {Component, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AuthService} from "./security/auth.service";
import {FormControl, Validators} from "@angular/forms";
import {PreviousRouteServiceService} from "./previous-route-service.service";

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

  constructor (private authService: AuthService , private prevRouteService : PreviousRouteServiceService) {
     console.log('Previous route is ' + this.prevRouteService.getPreviousUrl())
  }


  loginGoogle() {

    this.authService.loginGoogle()
      .subscribe(
        () => {

        }
        ,
        () => {

        });
  }

  loginFacebook() {


    this.authService.loginFacebook()
      .subscribe(
        () => {

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
