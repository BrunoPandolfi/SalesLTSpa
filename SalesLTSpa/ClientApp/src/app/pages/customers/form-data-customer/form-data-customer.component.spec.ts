import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataCustomerComponent } from './form-data-customer.component';

describe('FormDataCustomerComponent', () => {
  let component: FormDataCustomerComponent;
  let fixture: ComponentFixture<FormDataCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDataCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDataCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
