import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppComponent } from './app.component';
import {
  MatAutocompleteModule,
  MatButtonModule, MatDialogModule,
  MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatListModule, MatMenuModule,
  MatProgressSpinnerModule, MatRadioModule, MatSelectModule,
  MatSidenavModule, MatSliderModule,
  MatTableModule,
  MatToolbarModule, MatTabsModule, MatIconModule
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
import { CoolchartComponent } from './coolchart/coolchart.component';
import { SubplotComponent } from './subplot/subplot.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { HighstockComponent } from './highstock/highstock.component';
import { ExperimentComponent } from './experiment/experiment.component';
import { SecurityComponent } from './security/security.component';
import {DialogContentExampleDialog, LoginService} from "./shared/loginservice.service";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {PreviousRouteServiceService} from "./shared/previous-route-service.service";
import { OverviewComponent } from './security/sub/overview/overview.component';
import { ChartsComponent } from './security/sub/charts/charts.component';
import { SecshareholdingsComponent } from './security/sub/secshareholdings/secshareholdings.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {LayoutServiceService} from "./shared/layout-service.service";

const appRoutes: Routes = [
  {path: '' , component: HomeComponent} ,
  {path: 'home' , component: HomeComponent} ,
  {path: 'login' , component: LoginComponent} ,
  {path: 'register' , component: RegisterComponent} ,
  {path: 'reset' , component: ResetComponent} ,
  {path: 'shareholdings' , component: ShareholdingsComponent},
  {path: 'coolchart' , component: CoolchartComponent},
  {path: 'subplot' , component: SubplotComponent},
  {path: 'highstock' , component: HighstockComponent},
  {path: 'experiment' , component: ExperimentComponent},
  {path: 'security/:fullid' , component: SecurityComponent}



];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ShareholdingsComponent,
    ResetComponent,
    CoolchartComponent,
    SubplotComponent,
    IndicatorsComponent,
    HighstockComponent,
    ExperimentComponent,
    SecurityComponent,
    DialogContentExampleDialog,
    OverviewComponent,
    ChartsComponent,
    SecshareholdingsComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatRadioModule,
    MatSliderModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTabsModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forRoot(appRoutes  ),
    AngularFireModule.initializeApp(  environment.firebase , 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HighchartsChartModule,
    LayoutModule,
    MatIconModule
  ],
  entryComponents: [ DialogContentExampleDialog],

  providers: [AuthService, HttpService , LoginService , PreviousRouteServiceService , LayoutServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
