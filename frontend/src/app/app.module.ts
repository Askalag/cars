import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PmComponent } from './pm/pm.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterial } from './angular-material.module';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import {CarsBoardComponent} from './cars-board/cars-board.component';
import { MainContentComponent } from './main-content/main-content.component';
import {CarInfoComponent} from './car-info/car-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    PmComponent,
    MainContentComponent,
    CarsBoardComponent,
    CarInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularMaterial,
    ReactiveFormsModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
