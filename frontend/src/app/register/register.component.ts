import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import {ErrorStateMatcher} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control.dirty || control.touched) && form.form.hasError('passwordsDoNotMatch');
  }

}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm_validation_messages = {
    'name' : [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Name must be at least 6 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 60 characters long' },
    ],
    'userName': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 3 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 20 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUserName', message: 'Your username has already been taken' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'maxlength', message: 'Email cannot be more than 30 characters long' },
      { type: 'pattern', message: 'Enter a valid email' },
      { type: 'validEmail', message: 'Your email has already been taken' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' },
      { type: 'maxlength', message: 'Password cannot be more than 40 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  };

  registerForm: FormGroup;
  errMatcher: ErrorMatcher = new ErrorMatcher();
  private subsc: Subscription;

  form: any = {};
  signUpInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  succeedMessage = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }



  initForm() {
    this.registerForm = this.fb.group({
      'name' : ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        this.nameValidator
      ])],
      'userName' : ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.userNameValidator
        ])],
      'email' : ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        this.emailValidator
      ])],
      'password' : ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
        this.passwordValidator
      ])],
      'verifyPassword' : ['']
    }, {validator : this.passwordMatchValidator});
  }

  nameValidator(control: FormControl) {
    return null;
  }

  userNameValidator(control: FormControl) {
    // const value: string = control.value;
    return null;
  }

  emailValidator(control: FormControl) {
    return null;
  }

  passwordValidator(control: FormControl) {
    return null;
  }

  passwordMatchValidator(form: FormGroup) {
    const match = form.get('password').value !== form.get('verifyPassword').value;

    return match ? { passwordsDoNotMatch: true } : null;
  }

  onSubmit() {
    console.log(this.form);

    this.signUpInfo = new SignUpInfo(
      this.registerForm.get('name').value,
      this.registerForm.get('userName').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value);

    this.authService.signUp(this.signUpInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;

        if (this.errorMessage.includes('validUserName')) {
          this.registerForm.controls['userName'].setErrors({'validUserName': true});
        }

        if (this.errorMessage.includes('validEmail')) {
          this.registerForm.controls['email'].setErrors({'validEmail': true});
        }
      },
      () => {
        this.succeedMessage = 'Succeeded !';
        setTimeout(() => {
            this.reloadPage();
          },
          2000);
      }
    );
  }

  reloadPage() {
    window.location.replace('');
  }
}
