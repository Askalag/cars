import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../car/car.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carUrl = 'http://localhost:8080/api/test/cars-board/';

  constructor(private http: HttpClient) {}

  getCarsBoard(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carUrl, httpOptions)
  }

  deleteCar(car: Car) {
    return this.http.delete<Car>(this.carUrl + car.id, httpOptions)
  }

}
