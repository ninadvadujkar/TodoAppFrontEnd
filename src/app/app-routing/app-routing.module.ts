import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ])
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }