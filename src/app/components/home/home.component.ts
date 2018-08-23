import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TodoService } from '../../services/todo.service';
import { StoreService } from '../../services/store.service';
import { Todo } from '../../models/todo';

/**
 * @description Component that gets rendered for the /home route. It sits behind an AuthGuard
 */
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
    // Get todos
    this._todoService.getTodos()
    .subscribe(
      resp => {
        this.todos = resp.data;
      },
      err => {
        console.log('error in getting todos', err);
        if (err.status === 403 || err.status === 401) {
          // Token not provided OR Cannot verify token. Need to get a new one
          this.errorMessage = err.json().message;
          this.endSessionAndLogout();
        } else {
          this.errorMessage = 'Failed to get todos';
        }
      }
    );
  }

  endSessionAndLogout() {
    alert('Cannot verify token. Application will navigate you to login page. Please login again!');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this._storeService.updateSharedData(false);
    this._router.navigate(['/login']);
  }

  updateTodos({todos, error}) {
    if (error) this.endSessionAndLogout();
    else this.todos = todos;
  }

}
