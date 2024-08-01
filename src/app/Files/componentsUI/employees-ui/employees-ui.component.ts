import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employees-ui',
  templateUrl: './employees-ui.component.html',
  styleUrls: ['./employees-ui.component.css']
})
export class EmployeesUIComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'position'];
  dataSource = new MatTableDataSource<Employee>(ELEMENT_DATA);
  value = '';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input ? input.value.trim().toLowerCase() : '';
    this.dataSource.filter = filterValue;
  }

  addNewEmployee(): void {
    // Logic to add a new employee
    console.log('New Employee button clicked');
  }
}

export interface Employee {
  id: number;
  name: string;
  position: string;
}

const ELEMENT_DATA: Employee[] = [
  {id: 1, name: 'John Doe', position: 'Software Engineer'},
  {id: 2, name: 'Jane Smith', position: 'Product Manager'},
  // Add more sample data as needed
];
