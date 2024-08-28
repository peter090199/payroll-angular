import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    // if (this.loginService.isLoggedIn()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }

    if (!this.loginService.isAuthenticated()) {
      this.loginService.handleUnauthorizedError(); // Auto-logout if the token is expired
      return false;
    }
    return true;
  }
}
