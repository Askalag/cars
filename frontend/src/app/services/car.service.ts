import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from '../shared/car.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carUrl = 'http://localhost:8080/api/cars/cars-board/';

  constructor(private http: HttpClient) {}

  getCarsBoard(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carUrl, httpOptions);
  }

  addCar(car: Car): Observable<string> {
    return this.http.put<string>(this.carUrl + 'add', car, httpOptions);
  }
  // ----- new way for test, temporarily (waiting... for del by id)
  deleteCar(car: Car): Observable<Car> {
    return this.http.request<Car>('delete', this.carUrl + 'delete', {'body': car});
  }
  getCarById(id: number) {
    return this.http.get<Car>(this.carUrl + 'view/' + id, httpOptions);
  }

}
