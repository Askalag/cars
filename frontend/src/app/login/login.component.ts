import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control.dirty || control.touched) && form.form.hasError('passwordsDoNotMatch');
  }

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm_validation_messages = {
    'userName': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 3 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 20 characters long' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' },
      { type: 'maxlength', message: 'Password cannot be more than 40 characters long' }
    ]
  };

  loginForm: FormGroup;
  errMatcher: ErrorMatcher = new ErrorMatcher();


  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: string;
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private fb: FormBuilder,  private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.initForm();

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  initForm() {
    this.loginForm = this.fb.group({
      'userName' : ['',
        Validators.compose([
          this.userNameValidator,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
      ])],
      'password' : ['', Validators.compose([
        this.passwordValidator,
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40)
      ])]
    });
  }

  userNameValidator(control: FormControl) {
    return null;
  }
  passwordValidator(control: FormControl) {
    return null;
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.loginForm.get('userName').value,
      this.loginForm.get('password').value);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUserName(data.userName);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.replace('');
  }
}
