import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersIndexComponent } from './customers-index.component';

describe('CustomersIndexComponent', () => {
  let component: CustomersIndexComponent;
  let fixture: ComponentFixture<CustomersIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
