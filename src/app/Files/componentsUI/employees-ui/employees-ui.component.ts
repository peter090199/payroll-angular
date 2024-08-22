import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeesService } from 'src/app/services/employees.service';
import { NotificationsService } from 'src/app/Global/notifications.service';


@Component({
  selector: 'app-employees-ui',
  templateUrl: './employees-ui.component.html',
  styleUrls: ['./employees-ui.component.css']
})
export class EmployeesUIComponent implements OnInit {

  btnSave     : string = "Save";
  loading     : boolean = false;
  EmployeeForm = new FormGroup({
              EmpID    : new FormControl(''),
              EmpName  : new FormControl(''),
              Address      : new FormControl(''),
              ContactNo     : new FormControl(''),
            
  });

  constructor(
    private dialog            : MatDialog,
    private dialogRef         : MatDialogRef<EmployeesUIComponent>,
    private empService: EmployeesService,
    private notificationService   : NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any, // passing data here from update

  ) { }

  ngOnInit(): void {
    if (this.data) {
      if(this.data.id){
        this.btnSave = "Update";
        this.EmployeeForm.controls['EmpID'].disable();
        this.GetItemFormData();
      }
    }else{
      this.onCheck(true);
    }
   
  }

  
  GetItemFormData(){
    if(this.data.Id){
      this.EmployeeForm.controls['Id'].setValue(this.data.Id);
      this.EmployeeForm.controls['EmpID'].setValue(this.data.EmpID);
    }

    this.EmployeeForm.controls['EmpName'].setValue(this.data.EmpName);
    this.EmployeeForm.controls['Address'].setValue(this.data.Address);
    this.EmployeeForm.controls['ContactNo'].setValue(this.data.ContactNo);
   
  }

  onSubmit(){
   
    this.loading = true;
    this.empService.postEmployee(this.EmployeeForm.getRawValue()).subscribe({
      next:(res)=>{
       this.notificationService.popupSwalMixin("Successfuly Saved.");
        if(this.btnSave == 'Save'){
          this.ResetForm();
          this.loading = false;
        }
        if(this.btnSave == 'Update'){
          this.notificationService.popupSwalMixin("Successfuly Updated.");
          this.dialogRef.close();
          this.loading = false;
        }
        
      },
      error:(err)=> {
        this.notificationService.toastrError(err.error);
      },
    });
  }

  onCheck(data: any) {
    if (data) {
      this.EmployeeForm.controls['EmpID'].disable();
      this.EmployeeForm.controls['EmpID'].setValue('generated');
    }
    else {
      this.EmployeeForm.controls['EmpID'].enable();
      this.EmployeeForm.controls['EmpID'].setValue('');
    }
  }


  ResetForm(){
    this.EmployeeForm.controls['EmpID'].setValue('');
    this.EmployeeForm.controls['EmpName'].setValue('');
    this.EmployeeForm.controls['Address'].setValue('');
    this.EmployeeForm.controls['ContactNo'].setValue('');
    
  }

}
