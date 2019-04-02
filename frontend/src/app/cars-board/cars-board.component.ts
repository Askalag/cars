import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {Car} from "../car/car.model";
import {CarService} from "../services/car.service";

@Component({
  selector: 'app-cars-board',
  templateUrl: './cars-board.component.html',
  styleUrls: ['./cars-board.component.css']
})
export class CarsBoardComponent implements OnInit {

  errorMessage: string;

  ELEMENT_DATA: Car[];

  displayedColumns: string[] = ['position', 'model', 'vin', 'year', 'mileAge', 'date', 'addedBy', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  onFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.initCarsTable();
  }

  initCarsTable(): void {
    this.carService.getCarsBoard().subscribe(
      data => {
      this.ELEMENT_DATA = data;
      this.dataSource.data = this.ELEMENT_DATA;
    },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      })
  }

  onDelete(car: Car): void {
    this.carService.deleteCar(car).subscribe();
    this.ELEMENT_DATA = this.ELEMENT_DATA.filter(c => c != car);
    this.dataSource.data = this.ELEMENT_DATA;
  }

}
