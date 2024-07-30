import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesUiComponent } from './employees-ui.component';

describe('EmployeesUiComponent', () => {
  let component: EmployeesUiComponent;
  let fixture: ComponentFixture<EmployeesUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
