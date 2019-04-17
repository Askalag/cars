import { Component, OnInit } from '@angular/core';
import {Car} from '../shared/car.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CarService} from '../services/car.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {

  public selectedCarId: number;
  public activeCar: Car;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {
  }

  ngOnInit() {
    this.selectedCarId = this.route.snapshot.params['id'];

    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.selectedCarId = params['id'];
    //   });

    this.carService.getCarById(this.selectedCarId).subscribe(data => {
      this.activeCar = data;
    });
  }

}
