import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private authenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.authenticated.asObservable();

  
  private apiUrl = 'http://localhost:5274/api'; // URL of your .NET API

  constructor(private http: HttpClient) { }

  // Example method to get data
 
  login(data: any, password: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
  // Example method to post data
  registter(register: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, register);
  }
}
