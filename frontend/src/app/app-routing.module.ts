import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import {CarsBoardComponent} from './cars-board/cars-board.component';
import {CarInfoComponent} from './car-info/car-info.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {   path: 'cars-board',
        component: CarsBoardComponent,
        children: [],
        canActivate: [AuthGuard]
    },
    {path: 'cars-board/:id', component: CarInfoComponent},
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
