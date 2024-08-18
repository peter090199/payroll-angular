import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { NotificationsService } from '../Global/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup; // Initialize with an empty FormGroup

  constructor(private fb: FormBuilder, private registerService: RegisterService,
    private notificationService:NotificationsService
  ) { 
    this.registerForm = this.fb.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit(): void {
  //  this.initializeForm();
  }

  // private initializeForm(): void {
  
  // }
  
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.getRawValue()).subscribe({
              next: (res) => {
                this.notificationService.popupSwalMixin("Successfully Saved. " + res.message);
                this.Reset();
              },
              error: (err) => {
                this.notificationService.toastrError(err.message);
              },
            });
    }
  }
  Reset()
  {
    this.registerForm.controls['UserName'].setValue('');
    this.registerForm.controls['Password'].setValue('');
  }
}
