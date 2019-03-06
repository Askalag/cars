import { Component, OnInit } from '@angular/core';

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
} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material";

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
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 3 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 15 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' },
      { type: 'opaErr', message: 'opaErr message' },
      { type: 'outOf15', message: '15 message' },
      { type: 'outOf16', message: '16 message' },
      { type: 'osa', message: 'osa message' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  }

  loginForm: FormGroup;
  errMatcher: ErrorMatcher = new ErrorMatcher();


  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
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
      'username' : ['',
        Validators.compose([
          this.userNameValidator,
          Validators.minLength(3),
          Validators.maxLength(15)
      ])],
      'password' : [''],
      'verifyPassword' : ''
    }, {validator : this.passwordMatchValidator})
  }

  userNameValidator(control: FormControl) {
    const value: string = control.value;

    if (value === 'osa') return {osa:true};
    if (value === '') return {required:true};

    return null;
  }

  passwordMatchValidator(form: FormGroup) {
    const match = form.get('password').value !== form.get('verifyPassword').value;

    return match ? { passwordsDoNotMatch: true } : null;
  }



  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.loginForm.get('username').value,
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
    window.location.reload();
  }
}
