export class Car {

  private id: number;
  private model: string;
  private vin: string;
  private year: number;
  private mileAge: number;
  private timeStamp: string;
  private addedBy: string;

  constructor(model: string, vin: string, year: number, mileAge: number, timeStamp: string, addedBy: string ) {
    this.model = model;
    this.vin = vin;
    this.year = year;
    this.mileAge = mileAge;
    this.timeStamp = timeStamp;
    this.addedBy = addedBy;

  }
}
