import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import {ErrorStateMatcher} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

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
    ],
    'userName': [
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
  };

  registerForm: FormGroup;
  errMatcher: ErrorMatcher = new ErrorMatcher();
  private subsc: Subscription;

  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }



  initForm() {
    this.registerForm = this.fb.group({
      'name' : [''],
      'userName' : ['',
        Validators.compose([
          this.userNameValidator,
          Validators.minLength(3),
          Validators.maxLength(15)
        ])],
      'email' : ['', Validators.email],
      'password' : [''],
      'verifyPassword' : ''
    }, {validator : this.passwordMatchValidator})
  }

  nameValidator(control: FormControl) {}

  userNameValidator(control: FormControl) {
    const value: string = control.value;

    if (value === 'osa') return {osa:true};
    if (value === '') return {required:true};

    return null;
  }

  emailValidator(control: FormControl) {}

  passwordValidator(control: FormControl) {}

  passwordMatchValidator(form: FormGroup) {
    const match = form.get('password').value !== form.get('verifyPassword').value;

    return match ? { passwordsDoNotMatch: true } : null;
  }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.registerForm.get('name').value,
      this.registerForm.get('userName').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      },
    );
  }



  reloadPage() {
    window.location.replace('dsfsdf');
  }
}
