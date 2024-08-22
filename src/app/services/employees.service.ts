import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { _url } from 'src/global-variables';
import { Employees } from '../Model/Employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  private _refreshrequired = new Subject<void>();

  get RequiredRefresh() {
    return this._refreshrequired;
  }

  getEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(_url+"Employees");
  }
    // save 
    postEmployee(EmployeeForm:any): Observable<any>{
      return this.http.post<any>(_url+'Employees/SavedEmployees',EmployeeForm).pipe(
        tap(()=>{
          this.RequiredRefresh.next();
        }),
        catchError(this.handleError<any>('Auth/register'))
      );
    }
    
  // // PUT: Update an existing employee
  // putEmployee(id: number, employee: EmployeesModel): Observable<any> {
  //   return this.http.put<any>(`${_url}/${id}`, employee, {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   });
  // }

  // DELETE: Remove an employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(_url +id);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }

}
