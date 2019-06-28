import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppComponent } from './app.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatTableModule,
  MatGridListModule,
  MatToolbarModule,
  MatTabsModule,
  MatIconModule,
  MatAccordionDisplayMode,
  MatExpansionModule,
  MatSortModule,
  MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule
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
import { BreakoutanalysisComponent } from './breakoutanalysis/breakoutanalysis.component';
import {StoreModule , ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import { localStorageSync } from 'ngrx-store-localstorage';
import {authReducer , AppState} from "./store/auth.reducers";
import * as fromPost from "./store/auth.reducers";
import { SummaryComponent } from './summary/summary.component';
import { ScreenerComponent } from './screener/screener.component';
import {DataService} from "./security/data.service";
import { AnnualComponent } from './security/sub/annual/annual.component';
import { QuarterComponent } from './security/sub/quarter/quarter.component';
import {IndicatorsComponent} from "./security/sub/indicators/indicators.component";
import { MarketComponent } from './market/market.component';



const appRoutes: Routes = [
  {path: '' , component: HomeComponent} ,
  {path: 'home' , component: HomeComponent} ,
  {path: 'market' , component: MarketComponent} ,
  {path: 'login' , component: LoginComponent} ,
  {path: 'register' , component: RegisterComponent} ,
  {path: 'reset' , component: ResetComponent} ,
  {path: 'shareholdings' , component: ShareholdingsComponent},
  {path: 'coolchart' , component: CoolchartComponent},
  {path: 'subplot' , component: SubplotComponent},
  {path: 'highstock' , component: HighstockComponent},
  {path: 'experiment' , component: ExperimentComponent},
  {path: 'security/:fullid' , component: SecurityComponent},
  {path: 'screener' , component: ScreenerComponent},
  {path: 'breakoutanalysis' , component: BreakoutanalysisComponent}




];

export interface TheState {
  post: fromPost.AppState
}


export const reducers: ActionReducerMap<TheState> = { post: authReducer};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['ingredients'], rehydrate: true})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

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
    MainNavComponent,
    BreakoutanalysisComponent,
    SummaryComponent,
    ScreenerComponent,
    AnnualComponent,
    QuarterComponent,
    MarketComponent
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
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTabsModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSortModule,
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
    MatIconModule,
    StoreModule.forRoot( {authUser: authReducer})
  ],
  entryComponents: [ DialogContentExampleDialog],

  providers: [AuthService, HttpService , LoginService , PreviousRouteServiceService , LayoutServiceService , DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
