import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../Global/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  ngOnInit(): void {
   // this.initializeForm();
  }
  
  // private initializeForm(): void {
  //   this.loginForm = this.fb.group({
  //     UserName: ['', [Validators.required]],
  //     Password: ['', [Validators.required, Validators.minLength(6)]]
  //   });
  // }
  
  hide = true;
  loginForm: FormGroup;
  hidePassword: any;

  constructor(private fb: FormBuilder, private router: Router,private loginService: LoginService,
    private notificationService:NotificationsService
  ) { 
    this.loginForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit() 
  {
    const { UserName, Password } = this.loginForm.value;
    this.loginService.login(UserName, Password).subscribe({
      next: (res) => {
        this.notificationService.popupSwalMixin(res.message);
        this.router.navigate(['/header/dashboard']);
      },
      error: (err) => {
        if (err.status === 401) {
          // If unauthorized, redirect to login
          this.router.navigate(['/login']);
        } else {
          this.notificationService.toastrError(err.error.message);
        }
      }
    });
  }

}

