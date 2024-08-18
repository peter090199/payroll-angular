import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeesUIComponent } from '../../componentsUI/employees-ui/employees-ui.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {


  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dialog : MatDialog){}
isTrue : boolean = false;
pageSizeOptions   : number[] = [5, 10, 25, 100];
  searchKey         : string = "";
  placeHolder       : string = "Search";
  employees         : any=[];
  defaultColumns: string[] = [    
    'CustomerId',
    'CustomerName',
    'Address',
    
  ];
  

  addNewEmployee(): void {
    const dialogConfig        = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    dialogConfig.width        = '600px';
    this.dialog.open(EmployeesUIComponent,dialogConfig);
  }
 
  onUpdate(_t75: any) {
    throw new Error('Method not implemented.');
    }
    onDelete(_t75: any) {
    throw new Error('Method not implemented.');
    }
  // applyFilter(){
  //   this.listData.filter = this.searchKey.trim().toLocaleLowerCase();
  // }

  clearSearch(){
    this.searchKey = "";
   }

  displayedColumns: string[] = ['id', 'name', 'position'];
  dataSource = new MatTableDataSource<Employee>(ELEMENT_DATA);
  value = '';

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input ? input.value.trim().toLowerCase() : '';
    this.dataSource.filter = filterValue;
  }

  openDialog() {
    this.dialog.open(EmployeesUIComponent, {
    });
    

}
}

export interface Employee{
  id: number;
  name: string;
  position: string;
}

const ELEMENT_DATA: Employee[] = [
  {id: 1, name: 'John Doe', position: 'Software Engineer'},
  {id: 2, name: 'Jane Smith', position: 'Product Manager'},
  // Add more sample data as needed
];
