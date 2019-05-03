import { Component, OnInit } from '@angular/core';
import {Car} from '../shared/car.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from '../services/car.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {

  public selectedCarId: number;
  public activeCar: Car;
  public editCar: Car;

  public inputs: number[] = [0, 1, 2, 3, 4, 5, 6];
  public inputsLabel: any[] = ['id', 'model', 'vin', 'year', 'mileAge', 'date', 'addedBy'];
  public isEdit: boolean[] = [false, false, false, false, false, false, false];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {
  }

  ngOnInit() {
    this.selectedCarId = this.route.snapshot.params['id'];

    this.carService.getCarById(this.selectedCarId).subscribe(data => {
      this.activeCar = data;
      this.editCar = {
        id: this.activeCar.id,
        model: this.activeCar.model,
        vin: this.activeCar.vin,
        year: this.activeCar.year,
        mileAge: this.activeCar.mileAge,
        date: this.activeCar.date,
        addedBy: this.activeCar.addedBy
      };
    });
  }

  onEdit(el: number) {
    this.isEdit[el] = !this.isEdit[el];
    if (!this.isEdit[el]) {
      this.carService.updateCar(this.activeCar).subscribe(data => {
        console.log(data);
      });

    }



  }
  onCancel(el: number) {
    this.isEdit[el] = !this.isEdit[el];
    this.activeCar[this.inputsLabel[el]] = this.editCar[this.inputsLabel[el]];
  }

}
