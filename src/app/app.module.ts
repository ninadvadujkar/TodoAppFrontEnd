import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { LoginService } from './services/login.service';
import { ProcessHttprespService } from './services/process-httpresp.service';
import { StoreService } from './services/store.service';
import { AuthGuardService } from './services/auth-guard.service';
import { TodoService } from './services/todo.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TodoFormComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [
    LoginService,
    ProcessHttprespService,
    StoreService,
    AuthGuardService,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
