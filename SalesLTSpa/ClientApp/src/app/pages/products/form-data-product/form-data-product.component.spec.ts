import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataProductComponent } from './form-data-product.component';

describe('FormDataProductComponent', () => {
  let component: FormDataProductComponent;
  let fixture: ComponentFixture<FormDataProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDataProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDataProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
