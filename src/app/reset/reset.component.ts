import {Component, Directive, Input, OnInit} from '@angular/core';
import {AuthService} from "../shared/security/auth.service";
import {FormControl, Validators} from "@angular/forms";



@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetControl =  new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  disable = true;
  bUserNotFound = false;
  buttonControl = new FormControl('');

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  resetPassword() {

    let emailString = this.resetControl.value;
    this.bUserNotFound = false;
    // Only send reset password email
    if (this.resetControl.errors == null) {
      console.log(this.resetControl.errors);
      this.authService.sendResetPassword( emailString).subscribe( () => {

          console.log("email is sent!")
        },
        (err) => {
           console.log('Not found is ' +  err['code'].includes('user-not-found'))
           if( err['code'].includes('user-not-found')) {
             this.bUserNotFound = true;
           } else {
             this.bUserNotFound = false;
           }

        })
    }


  }

}
