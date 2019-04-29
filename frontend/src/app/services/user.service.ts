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

  private usersUrl = 'http://localhost:8080/api/users';


  constructor(private http: HttpClient) { }

  getUserByUserName(name: string) {
    httpOptions.params = new HttpParams().set('userName', name);
    return this.http.get<User>(this.usersUrl + '/search', httpOptions);
  }
}
