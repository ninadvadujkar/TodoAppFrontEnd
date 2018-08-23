import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TodoService } from '../../services/todo.service';

/**
 * @description Form that allows user to add a new todo
 */
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  @Output() onAddition = new EventEmitter();
  todoForm: FormGroup;
  formData: any;
  formErrors: any = {
    'todo': '',
  };
  validationMessages: any = {
    'todo': {
      'required': 'Todo is required',
    },
  };
  todoCreateErrMsg: string;
  constructor(private _fb: FormBuilder, private _todoService: TodoService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.todoForm = this._fb.group({
      todo: ['', [Validators.required]],
    });

    this.todoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if(!this.todoForm) return;
    const form = this.todoForm;

    for(let field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for(let key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  resetForm(): void {
    this.todoCreateErrMsg = '';
    this.todoForm.reset({
      username: '',
      password: '',
    });
  }

  onAdd(): void {
    this.formData = {
      message: this.todoForm.get('todo').value,
    };
    this._todoService.createTodo(this.formData)
      .subscribe(
        resp => {
          this.onAddition.emit({todos: resp.data});
          this.resetForm();
        },
        err => {
          console.log('Failed to create todo', err);
          if (err.status === 403) {
            // Token not provided!
            this.todoCreateErrMsg = err.json().message;
          } else if (err.status === 401) {
            // Cannot verify token. Need to get a new one
            this.todoCreateErrMsg = err.json().message;
            this.onAddition.emit({error: err});
          } else {          
            this.todoCreateErrMsg = 'Failed to create todo. Try again!'
            alert(this.todoCreateErrMsg);
          }
        }
      );
  }

}
