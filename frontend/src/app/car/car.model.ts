export class Car {

  public id: number;
  public model: string;
  public vin: string;
  public year: number;
  public mileAge: number;
  public timeStamp: string;
  public addedBy: string;

  constructor(model: string, vin: string, year: number, mileAge: number, timeStamp: string, addedBy: string ) {
    this.model = model;
    this.vin = vin;
    this.year = year;
    this.mileAge = mileAge;
    this.timeStamp = timeStamp;
    this.addedBy = addedBy;

  }
}
