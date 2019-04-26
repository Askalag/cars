import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {CarService} from '../../services/car.service';
import {Car} from '../../shared/car.model';

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
      { type: 'required', message: 'Year is required' }
    ],
    'mileage': [
      { type: 'required', message: 'Mileage is required' },
      { type: 'areEqual', message: 'Mileage must be between 1 and 6 numbers ' }
    ]
  };

  public car: Car;

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
          this.vinValidator()
        ])],
      'mileAge' : ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(6),
          this.mileAgeValidator()

        ])],
      'year' : [''],
    }, {validator : this.allMatchValidator});
  }

  vinValidator() {
    return null;
  }
  mileAgeValidator() {
    return null;
  }

  allMatchValidator() {
    return null;
  }

  onSubmit() {
    this.car = new Car(
      null,
      this.addCarForm.get('model').value,
      this.addCarForm.get('vin').value,
      this.addCarForm.get('year').value,
      this.addCarForm.get('mileage').value,
      null,
      null
    );

    // this.carService.addCar(this.car).subscribe()

  }

}
