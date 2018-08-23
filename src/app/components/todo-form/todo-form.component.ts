import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
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
  constructor(private _fb: FormBuilder) { }

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
    console.log(this.todoForm.get('todo').value);
  }

}
