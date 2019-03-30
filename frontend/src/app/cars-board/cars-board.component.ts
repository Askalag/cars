import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {Car} from "../car/car.model";

@Component({
  selector: 'app-cars-board',
  templateUrl: './cars-board.component.html',
  styleUrls: ['./cars-board.component.css']
})
export class CarsBoardComponent implements OnInit {

  ELEMENT_DATA: Car[];

  displayedColumns: string[] = ['position', 'model', 'vin', 'year', 'mileAge', 'timeStamp', 'addedBy', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  onFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() { }

  ngOnInit() {
  }

}
