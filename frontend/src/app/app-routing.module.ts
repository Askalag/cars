import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import {CarsBoardComponent} from './cars-board/cars-board.component';
import {CarInfoComponent} from './car-info/car-info.component';
import {AuthGuard} from './auth/auth.guard';
import {AddCarComponent} from './cars-board/add-car/add-car.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users/user',
    component: UserComponent
  },
  {
    path: 'cars/cars-board',
    component: CarsBoardComponent,
    children: [],
    canActivate: [AuthGuard]
  },
  {
    path: 'cars/cars-board/add-car',
    component: AddCarComponent,
    children: [],
    canActivate: [AuthGuard]
  },
  {
    path: 'cars/cars-board/view/:id',
    component: CarInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
