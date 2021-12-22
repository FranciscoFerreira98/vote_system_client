import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool
import { NgModule,LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardMesaComponent } from './dashboard-mesa/dashboard-mesa.component';
import { registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditPollComponent } from './edit-poll/edit-poll.component';
registerLocaleData(localePt)

import { DataTablesModule } from "angular-datatables";
import { VoteComponent } from './vote/vote.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ResultComponent } from './result/result.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    DashboardMesaComponent,
    CreatePollComponent,
    EditPollComponent,
    VoteComponent,
    ResultComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    SweetAlert2Module.forRoot(),
    DataTablesModule,
    NgApexchartsModule,
    NgxPaginationModule,
    HttpClientModule,
    FlatpickrModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),

  ],
  providers: [authInterceptorProviders, { provide: LOCALE_ID, useValue: 'pt-PT' }],
  bootstrap: [AppComponent]
})
export class AppModule { }