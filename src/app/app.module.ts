import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatListModule, MatMenuModule, MatSidenavModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Routes, RouterModule} from '@angular/router';
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {environment} from "../environments/environment";
import {AngularFireModule} from "angularfire2";
import {AuthService} from './shared/security/auth.service';
import {HttpService} from './shared/httpservice.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShareholdingsComponent } from './shareholdings/shareholdings.component';
import { ResetComponent } from './reset/reset.component';

const appRoutes: Routes = [
  {path: '' , component: HomeComponent} ,
  {path: 'login' , component: LoginComponent} ,
  {path: 'register' , component: RegisterComponent} ,
  {path: 'reset' , component: ResetComponent} ,
  {path: 'shareholdings' , component: ShareholdingsComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ShareholdingsComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forRoot(appRoutes , {useHash: true}),
    AngularFireModule.initializeApp(  environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
