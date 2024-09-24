import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password-ui',
  templateUrl: './change-password-ui.component.html',
  styleUrls: ['./change-password-ui.component.css']
})
export class ChangePasswordUIComponent implements OnInit {
  passwordForm!: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;
      // Implement your password update logic here
      console.log('Password updated:', currentPassword, newPassword, confirmPassword);
    }
  }
 
}
