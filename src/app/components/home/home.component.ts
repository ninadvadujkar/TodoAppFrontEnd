import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TodoService } from '../../services/todo.service';
import { StoreService } from '../../services/store.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todos: Todo[];
  errorMessage: string;
  constructor(private _todoService: TodoService, private _router: Router, private _storeService: StoreService) { }

  ngOnInit() {
    this._todoService.getTodos()
    .subscribe(
      resp => {
        this.todos = resp.data;
      },
      err => {
        console.log('error in getting todos', err);
        if (err.status === 403) {
          // Token not provided!
          this.errorMessage = err.json().message;
        } else if (err.status === 401) {
          // Cannot verify token. Need to get a new one
          this.errorMessage = err.json().message;
          alert('Cannot verify token. Application will navigate you to login page. Please login again!');
          localStorage.removeItem('username');
          localStorage.removeItem('token');
          this._storeService.updateSharedData(false);          
          this._router.navigate(['/login']);
        } else {
          this.errorMessage = 'Failed to get todos';
        }
      }
    );
  }

}
