import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private tokenKey = 'authToken';
  
  private _refreshrequired = new Subject<void>();

  get RequiredRefresh() {
    return this._refreshrequired;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  // Check if the user is authenticated and token is valid
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  // Login method
  login(UserName: string, Password: string): Observable<any> {
    return this.http.post<any>(_url + 'Auth/login', { UserName, Password }).pipe(
      tap(res => {
        // Assuming `res` contains the token
        if (res && res.token) {
          this.saveToken(res.token);
          this._refreshrequired.next();
        }
      }),
      catchError(this.handleLoginError())
    );
  }

  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Save token to local storage
  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Handle login errors
  private handleLoginError<T>(operation = 'Auth/login', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 401) {
        this.handleUnauthorizedError();
      } else {
        this.handleGeneralError(error.message);
      }
      return of(result as T);
    };
  }

  // Handle unauthorized errors (e.g., token expired)
  private handleUnauthorizedError(): void {
    this.logout(); // Remove token and redirect to login
    Swal.fire({
      icon: 'error',
      title: 'Session Expired',
      text: 'Your session has expired. Please log in again.',
    });
  }

  // Handle general errors
  private handleGeneralError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `An error occurred: ${message}`,
      footer: 'Please try again!'
    });
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }
  // Logout method
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']); // Redirect to login page
  }
}
