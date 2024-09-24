import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordUIComponent } from '../change-password-ui/change-password-ui.component';

@Component({
  selector: 'app-user-profile-ui',
  templateUrl: './user-profile-ui.component.html',
  styleUrls: ['./user-profile-ui.component.css']
})

export class UserProfileUIComponent implements OnInit {
  profileForm!: FormGroup;
  profileImageUrl: string = 'assets/default-profile.png'; // Placeholder image
  user = {
    firstName: 'Pedro',
    middleName: 'Lapasaran',
    lastName: 'Yorpo Jr.',
    jobTitle: 'Software Engineer',
    username: 'ME181',
    employeeNo: 'ME181',
    birthDate: '1999-09-01',
    contactNo: '0995-913-0750',
    email: 'codewarrior05.mariosoft@gmail.com',
    address: 'Cordova, Cebu City'
  };
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  getuserName: any;
  userName: string = "";

  constructor(
    private fb: FormBuilder, private http: HttpClient,
    private authService:LoginService,
    private dialog : MatDialog,


  ){  
      this.getuserName = this.authService.getUserNameProfile();
      this.userName = this.getuserName; 
   }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      employeeNo: [{ value: this.user.employeeNo, disabled: true }],
      username: [this.userName, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      middleName: [this.user.middleName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      birthDate: [this.user.birthDate, Validators.required],
      contactNo: [this.user.contactNo, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      address: [this.user.address, Validators.required],
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.http.put('https://your-backend-api/api/user', this.profileForm.value).subscribe(
        (response) => {
          console.log('Profile updated successfully');
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }

  onChangePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(ChangePasswordUIComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.loadEmployees(); // Refresh the table after dialog closure
      }
    });
  }


  onUploadPhoto(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

