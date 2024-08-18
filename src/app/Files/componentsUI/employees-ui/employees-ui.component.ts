import { Component, OnInit,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Define the interface for form data
export interface FormData {
  [key: string]: any; // Index signature for dynamic property access
  customerId: string;
  customerName: string;
  address: string;
  contactNo: string;
}

@Component({
  selector: 'app-employees-ui',
  templateUrl: './employees-ui.component.html',
  styleUrls: ['./employees-ui.component.css']
})
export class EmployeesUIComponent implements OnInit {
  formGroup!: FormGroup; // Initialized to be properly handled

  constructor(private fb: FormBuilder,
    private dialog            : MatDialog,
    private dialogRef         : MatDialogRef<EmployeesUIComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void{
    this.formGroup = this.fb.group({
      employeeId: [this.data?.employeeId || '', Validators.required],
      employeeName: [this.data?.employeeName || '', Validators.required],
      address: [this.data?.address || '', Validators.required],
      contactNo: [this.data?.contactNo || '', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
}

  onSubmit(): void {
    if (this.formGroup.valid) {
      // Cast form value to FormData type for better type safety
      const formData: FormData = this.formGroup.value;
      console.log(formData);
      // Handle form submission logic here
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
