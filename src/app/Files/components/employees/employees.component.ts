import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Employees } from 'src/app/Model/Employees';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeesUIComponent } from '../../componentsUI/employees-ui/employees-ui.component';
import { EditEmployeeComponent } from '../../componentsUI/edit-employees/edit-employee-component';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'empID', 'empName', 'address', 'contactNo', 'actions'];
  dataSource = new MatTableDataSource<Employees>();
  isLoading = true;
  placeHolder       : string = "Search";
  searchKey         : string = "";
  // employees         : any=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeesService, private dialog : MatDialog) {}

  ngOnInit(): void {
    this.loadEmployees();
  }
  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }
  clearSearch(){
    this.searchKey = "";
    this.applyFilter();
  }
  onClickNew(){
    const dialogConfig        = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    dialogConfig.width        = '400px';
    this.dialog.open(EmployeesUIComponent,dialogConfig);
  }
  

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.dataSource.data = employees;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching employee data:', error);
        this.isLoading = false;
      }
    );
  }
 
  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          console.log(`Employee with ID: ${id} deleted successfully`);
          this.loadEmployees(); // Refresh the table after deleting an employee
        },
        (error) => {
          console.error('Error deleting employee', error);
        }
      );
    }
  }
  
  editEmployee(id: number): void {
    const employee = this.dataSource.data.find(emp => emp.Id == id);
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '400px',
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees(); // Refresh the table after editing an employee
      }
    });
  }

}
