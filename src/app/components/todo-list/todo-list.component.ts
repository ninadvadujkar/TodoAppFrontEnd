import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() private todos: Todo[];
  @Output() private onDelete = new EventEmitter();
  todoDeleteErrMsg: string;
  constructor(private _todoService: TodoService) { }

  ngOnInit() {
  }

  delete(id) {
    this._todoService.deleteTodo(id)
      .subscribe(
        resp => {
          this.onDelete.emit({todos: resp.data});
        },
        err => {
          console.log('Failed to delete todo');
          if (err.status === 403) {
            // Token not provided!
            this.todoDeleteErrMsg = err.json().message;
          } else if (err.status === 401) {
            // Cannot verify token. Need to get a new one
            this.todoDeleteErrMsg = err.json().message;
            this.onDelete.emit({error: err});
          } else if (err.status === 404) {
            this.todoDeleteErrMsg = err.json().message;
          } else {       
            this.todoDeleteErrMsg = 'Failed to create todo. Try again!'
            alert(this.todoDeleteErrMsg);
          }
        }
      );    
  }

}
