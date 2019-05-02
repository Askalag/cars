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

  public inputs: number[] = [0, 1, 2, 3, 4, 5, 6];
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
    });
  }

  onEdit(element: number) {
    this.isEdit[element] = !this.isEdit[element];
  }

}
