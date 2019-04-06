import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {User} from '../user/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: new HttpParams()
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/test';


  constructor(private http: HttpClient) { }

  getUserByUserName(name: string): Observable<User> {
    httpOptions.params = new HttpParams().set('userName', name);
    return this.http.get<User>(this.baseUrl + '/users/search', httpOptions);
  }
}
