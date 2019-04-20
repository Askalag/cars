import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {CarService} from '../../services/car.service';

class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control.dirty || control.touched) && form.form.hasError('passwordsDoNotMatch');
  }

}

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  addCarForm_validation_messages = {
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

  addCarForm: FormGroup;
  errMatcher: ErrorMatcher = new ErrorMatcher();

  constructor(private fb: FormBuilder,
              private carService: CarService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addCarForm = this.fb.group({
      'name' : ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ])],
    }, {validator : this.allMatchValidator});
  }

  allMatchValidator() {
    return null;
  }

  onSubmit() {

  }

}
