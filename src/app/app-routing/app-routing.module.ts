import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';

import { AuthGuardService } from '../services/auth-guard.service';

/**
 * @description App routing module. Handles routing of all the angular routes in this app.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ])
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }