import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() private todos: Todo[];
  constructor() { }

  ngOnInit() {
  }

  delete(id) {
    console.log('id to be deleted', id);
  }

}
