import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsUiComponent } from './clients-ui.component';

describe('ClientsUiComponent', () => {
  let component: ClientsUiComponent;
  let fixture: ComponentFixture<ClientsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
