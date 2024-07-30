import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesUiComponent } from './branches-ui.component';

describe('BranchesUiComponent', () => {
  let component: BranchesUiComponent;
  let fixture: ComponentFixture<BranchesUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchesUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
