import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { UsersRoleService } from 'src/app/services/users-role.service';
import { UsersUIRoleComponent } from '../../componentsUI/users-ui-role/users-ui-role.component';
import { firstValueFrom } from 'rxjs';
import { NotificationsService } from 'src/app/Global/notifications.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {
  displayedColumns: string[] = ['id', 'userName', 'role', 'actions'];
  user = new MatTableDataSource<any>([]);
  isLoading = true;
  placeHolder       : string = "Search";
  searchKey         : string = "";
  users         : any=[];
  pageSizeOptions   : number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usersService: UsersRoleService, 
    private dialog : MatDialog,
    private notificationsService : NotificationsService
  ){}

  ngOnInit(): void {
    this.loadUsers();
  }

  applyFilter(){
    this.user.filter = this.searchKey.trim().toLocaleLowerCase();
  }
  clearSearch(){
    this.searchKey = "";
    this.applyFilter();
  }

  onClickNew(): void {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '400px';
    // const dialogRef = this.dialog.open(EmployeesUIComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.loadEmployees(); // Refresh the table after dialog closure
    //   }
    // });
  }
  
  async loadUsers(): Promise<void> {
    try {
      this.isLoading = true;
      this.users = await firstValueFrom(this.usersService.getUsers());
      this.user.data = this.users;
      this.user.paginator = this.paginator;
      this.user.sort = this.sort;
      this.isLoading = false;
  
    } catch (error) {
      console.error('Error fetching employee data:', error);
      this.isLoading = false;
    }
  }
 
  deleteEmployee(employee:any){
    if(!employee){
      this.notificationsService.toastrWarning('No record selected!');
      
    }
  }
    // else{
    //   this.notificationsService.popupWarning(employee.empName,"-"+"Are you sure to delete this employee?").then((result) => {
    //     if (result.value) {
    //       this.employeeService.deleteEmployee(employee.empID).subscribe({
    //           next:()=>{
    //             this.notificationsService.popupSwalMixin("Successfuly deleted "+ employee.empName);
    //             this.loadEmployees();
    //           },
    //           error:()=>{
    //             this.notificationsService.toastrError("no employee id");
    //             this.loadEmployees();
    //           },
    //       });
    //     }
    //  });
   // }
  

  editEmployee(data?: any): void {
    const dialogRef = this.dialog.open(UsersUIRoleComponent, {
      width: '400px',
      data: data || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }


}



