export class Car {

  id: number;
  model: string;
  vin: string;
  year: number;
  mileAge: number;
  date: string;
  addedBy: string;

  constructor(model: string, vin: string, year: number, mileage: number) {
    this.model = model;
    this.vin = vin;
    this.year = year;
    this.mileAge = mileage;
  }

}
