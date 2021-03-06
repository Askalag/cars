import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {CarService} from '../../services/car.service';
import {Car} from '../../shared/car.model';
import {windowCount} from "rxjs/operators";

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
    'model' : [
      {},
    ],
    'vin': [
      { type: 'required', message: 'VIN number is required' },
      { type: 'validLength', message: 'VIN must to contain 17 digits' },
      { type: 'unique', message: 'This VIN has already exist' }

    ],
    'year': [
      { type: 'required', message: 'Year is required' },
      { type: 'yEqual', message: 'Year should contains only numbers' }
    ],
    'mileage': [
      { type: 'required', message: 'Mileage is required' },
      { type: 'maEqual', message: 'Mileage should contains only numbers' }
    ]
  };

  car: Car;
  statusMessage: string;


  addCarForm: FormGroup;
  errMatcher: ErrorMatcher = new ErrorMatcher();


  constructor(private fb: FormBuilder,
              private carService: CarService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addCarForm = this.fb.group({
      'model' : [''],
      'vin' : ['',
        Validators.compose([
          Validators.required,
          this.vinValidator
        ])],
      'mileAge' : ['',
        Validators.compose([
          Validators.required,
          this.mileAgeValidator
        ])],
      'year' : ['',
        Validators.compose([
          Validators.required,
          this.yearValidator
        ])],
    }, {validator : this.allMatchValidator});
  }

  vinValidator(fc: FormControl) {
    const vin: string = fc.value;
    return vin.length === 17 ? null : {validLength: true};
  }
  mileAgeValidator(fc: FormControl) {
    const mileAge: number = Number(fc.value);

    if (isNaN(mileAge)) {
      return {maEqual: true};
    }

    return null;
  }
  yearValidator(fc: FormControl) {
    const year: number = Number(fc.value);

    if (isNaN(year)) {
      return {yEqual: true};
    }

    return null;
  }

  allMatchValidator() {
    return null;
  }

  onSubmit() {
    this.car = {
      id: null,
      model: this.addCarForm.get('model').value,
      vin: this.addCarForm.get('vin').value,
      year: this.addCarForm.get('year').value,
      mileAge: this.addCarForm.get('mileAge').value,
      date: null,
      addedBy: null
    }




    ;

    this.carService.addCar(this.car).subscribe(
      data => {},
      error => {
        console.log(error);
        if (error.error.message.includes('already')) {
          this.addCarForm.controls['vin'].setErrors({unique: true});
        }
        this.statusMessage = error.error.message;
      },
      () => {
        this.statusMessage = 'Succeed';
        window.location.replace('http://localhost:4200/cars/cars-board');
      });

  }

}
