import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { firstValueFrom } from 'rxjs';
import { EmployeesService } from 'src/app/services/employees.service';
import { NotificationsService } from 'src/app/Global/notifications.service';
import { EmployeesUIComponent } from '../../componentsUI/employees-ui/employees-ui.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, AfterViewInit {

  listData = new MatTableDataSource<any>;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  searchKey: string = "";
  placeHolder: string = "Search Item";
  employees: any[] = [];
  TransDateFrom: any = new Date();
  TransDateTo: any = new Date();

  defaultColumns: string[] = [
    'EmpID',
    'EmpName',
    'Address',
  ];
  numberColumns: string[] = [
    'ContactNo',
  ];
  addedColumns: string[] = [
    'actions',
  ];
  mergeColumns = this.defaultColumns.concat(this.numberColumns,this.addedColumns);

  isTrue: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private employeesService: EmployeesService,
    private dialog: MatDialog,
    private notificationsService: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.GetItems();
    this.employeesService.RequiredRefresh.subscribe(() => {
      this.GetItems();
    });
  }

  ngAfterViewInit(): void {
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;
  }
  async GetItems(){
    this.isTrue = true;
    this.employees = await firstValueFrom(this.employeesService.getEmployees());
    if(this.employees)
      this.isTrue = false;
    this.DisplayRecords();
    
  }
  applyFilter() {
    if (this.listData) {
      this.listData.filter = this.searchKey.trim().toLowerCase();
      if (this.listData.paginator) {
        this.listData.paginator.firstPage();
      }
    }
  }

  clearSearch() {
    this.searchKey = "";
    this.applyFilter();
  }

  DisplayRecords() {
    var items = this.employees;

    this.listData = new MatTableDataSource(items);
    this.listData.paginator = this.paginator;
  }

  onUpdate(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';
    dialogConfig.data = data;
    this.dialog.open(EmployeesUIComponent, dialogConfig);
  }

  onClickNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';
    this.dialog.open(EmployeesUIComponent, dialogConfig);
  }

  onDelete(data: any) {
    if (!data) {
      this.notificationsService.toastrWarning('No record selected!');
      return;
    }

    // Example confirmation dialog
    this.notificationsService.popupWarning("Customer Name", "Are you sure to delete this customer?").then((result) => {
      if (result.value) {
        this.employeesService.deleteEmployee(data.EmpID).subscribe({
          next: (res) => {
            this.notificationsService.toastrSuccess(res.message);
            this.GetItems(); // Refresh the data
          },
          error: (err) => {
            this.notificationsService.toastrError(err.error);
          },
        });
      }
    });
  }
}
