import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { StoreService } from '../../services/store.service';

/**
 * @description Component for the login route. Allows user to log into the app.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formData: any;
  formErrors: any = {
    'username': '',
    'password': '',
  };
  loginFailureErrMsg: string;
  validationMessages: any = {
    'username': {
      'required': 'User name is required',
      'minlength': 'User name must be atleast 2 characters long',
      'maxlength': 'User name cannot be more than 25 characters',
    },
    'password': {
      'required': 'Password is required',
      'minlength': 'Password must be atleast 5 characters long',
      'maxlength': 'Password cannot be more than 25 characters',
    }    
  };


  constructor(private _fb: FormBuilder, private _loginService: LoginService, private _router: Router, private _storeService: StoreService) {
    this.createForm();
  }

  ngOnInit() {
  }

  /**
   * @description creates reactive form group. Also subscribe to the value changes. Done in order to trigger the validation messages,
   */
  createForm(): void {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if(!this.loginForm) return;
    const form = this.loginForm;

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
    this.loginFailureErrMsg = '';
    this.loginForm.reset({
      username: '',
      password: '',
    });    
  }

  onSubmit(): void {
    this.formData = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
    };
    console.log('form', this.formData);
    this._loginService.login(this.formData.username, this.formData.password)
      .subscribe(
        resp => {
          console.log('Response', resp);
          localStorage.setItem('username', this.formData.username);
          localStorage.setItem('token', resp.data);
          this._storeService.updateSharedData(true);
          this.resetForm();
          this._router.navigate(['/home']);
        },
        err => {
          console.log('Err', err);
          this.loginFailureErrMsg = 'Login Failed! Invalid Credentials. Please enter correct credentials';
          alert(this.loginFailureErrMsg);
          this.resetForm();
        }
      )
  }

}
