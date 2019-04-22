export class Car {

  id: number;
  model: string;
  vin: string;
  year: number;
  mileAge: number;
  date: string;
  addedBy: string;

  constructor(id: number, model: string, vin: string, year: number, mileage: number, data: string, addedBy: string) {
    this.id = id;
    this.model = model;
    this.vin = vin;
    this.year = year;
    this.mileAge = mileage;
    this.date = data;
    this.addedBy = addedBy;
  }

}
