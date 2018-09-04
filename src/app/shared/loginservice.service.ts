import {Component, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';

@Injectable()
export class LoginService {

  constructor(private loginDialog: MatDialog) {}

  openDialog() {

     this.loginDialog.open( DialogContentExampleDialog );

  }


}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'loginDialog.html',
})
export class DialogContentExampleDialog {

  clickMe() {
    console.log('Click Me!!!');
  }
}
