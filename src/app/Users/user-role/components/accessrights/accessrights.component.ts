// import { Component } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { debounceTime, Subject } from 'rxjs';
// import { AccessrightsService } from 'src/app/services/accessrights.service';

// interface Element {
//   id: number;
//   name: string;
// }

// @Component({
//   selector: 'app-accessrights',
//   templateUrl: './accessrights.component.html',
//   styleUrls: ['./accessrights.component.css']
// })
// export class AccessrightsComponent {
//   textValue: string = '';
  
//   private autoSaveSubject = new Subject<string>();

//   constructor(private accessrights:AccessrightsService) {}

//   ngOnInit(): void {
//     this.autoSaveSubject.pipe(debounceTime(1000)).subscribe(() => {
//     });
//   }

//   onEnterPress(event: KeyboardEvent): void {
//     if (event.key === "Enter") {
//       this.saveAndClear();
//     }
//   }

//     saveAndClear(): void {
//       if (this.textValue.trim() === "") {
//         console.log('Text is empty. No data to save.');
//         return; // Do not proceed if textValue is empty
//       }
      
//     const accessRightName = { textValue: this.textValue };
//     this.accessrights.saveUserAccess(accessRightName).subscribe({
//       next: (res) => {
//         console.log('Text saved:', res.message);
//        this.clearText();
//       },
//       error: (error) => {
//         console.error('Error saving text:', error);
//       },
//     });
//     //  const accessName = { textValue: this.textValue };
//     // console.log(accessRightName)
//     //   this.accessrights.saveUserAccess(accessRightName).subscribe(
//     //     (response) => {
//     //       console.log('Text saved:', response.message);
//     //       this.clearText();
//     //     },
//     //     (error) => {
//     //       console.error('Error saving text:', error);
//     //     }
//     //   );
//     }
  
  
//   onTextChanged(): void {
//     this.autoSaveSubject.next(this.textValue); // Trigger auto-save on every keypress
//   }

//   // autoSaveText(): void {
//   //   const textData = { textValue: this.textValue };
//   //   console.log(textData)
//   //   // this.textBoxService.saveText(textData).subscribe(
//   //   //   response => {
//   //   //     console.log('Text saved:', response.message);
//   //   //   },
//   //   //   error => {
//   //   //     console.error('Error saving text:', error);
//   //   //   }
//   //   // );
//   // }

//   clearText(): void {
//     this.textValue = '';
//   }

//   displayedColumns: string[] = ['id', 'name'];
//   isLoading = true;
//   pageSizeOptions1   : number[] = [5, 10, 25, 100];
//   pageSizeOptions2   : number[] = [5, 10, 25, 100];
//   pageSizeOptions3   : number[] = [5, 10, 25, 100];

//   dataSource1 = new MatTableDataSource<Element>([
//     { id: 1, name: 'Item 1' },
//     { id: 2, name: 'Item 2' },
//     { id: 3, name: 'Item 3' },
//     { id: 4, name: 'Item 4' },
//     // more data...
//   ]);

//   dataSource2 = new MatTableDataSource<Element>([
//     { id: 3, name: 'Item 3' },
//     { id: 4, name: 'Item 4' },
//     // more data...
//   ]);

//   dataSource3 = new MatTableDataSource<Element>([
//     { id: 5, name: 'Item 5' },
//     { id: 6, name: 'Item 6' },
//     // more data...
//   ]);
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { AccessrightsService } from 'src/app/services/accessrights.service';

@Component({
  selector: 'app-accessrights',
  templateUrl: './accessrights.component.html',
  styleUrls: ['./accessrights.component.css']
})

export class AccessrightsComponent implements OnInit {
  
  accessRightForm = new FormGroup({
    id                : new FormControl(0),
    accessRightName   : new FormControl(''),
    recordStatus      : new FormControl('Active')
});

  dataSource1 = new MatTableDataSource<Element>(ELEMENT_DATA_1);
  dataSource2 = new MatTableDataSource<Element>(ELEMENT_DATA_2);
  pageSizeOptions1: number[] = [5, 10, 25];
  pageSizeOptions2: number[] = [5, 10, 25];
  pageSizeOptions3: number[] = [5, 10, 25];
  displayedColumns: string[] = ['id', 'name'];
  isLoading = false;

  @ViewChild(MatPaginator) paginator1!: MatPaginator;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatPaginator) paginator3!: MatPaginator;

  constructor(private fb: FormBuilder,private accessrights:AccessrightsService) { }

  ngOnInit(): void {
    this.accessRightForm = this.fb.group({
      accessRightName: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator1;
    this.dataSource2.paginator = this.paginator2;
  }

  saveAccessRight() {
    const accessName = this.accessRightForm.getRawValue();

    if (this.accessRightForm.valid) {
      this.accessrights.saveUserAccess(accessName).subscribe({
        next: () => {
          console.log('Access right saved:', accessName);
          this.isLoading = false;
          this.accessRightForm.reset();
        },
        error: (error) => {
          console.error('Error saving text:', error);
          this.isLoading = false;
        },
      });
    }
  }

  deleteAccessRight() {
    console.log('Access right deleted');
    // Handle delete logic here
  }

  clearText() {
    this.accessRightForm.reset(); // Clears the input field
  }
}

export interface Element {
  id: number;
  name: string;
}

// Mock data for tables
const ELEMENT_DATA_1: Element[] = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Jane'},
  {id: 3, name: 'Smith'},
];

const ELEMENT_DATA_2: Element[] = [
  {id: 1, name: 'Admin'},
  {id: 2, name: 'User'},
];
