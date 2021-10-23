import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSalesorderComponent } from './resume-salesorder.component';

describe('ResumeSalesorderComponent', () => {
  let component: ResumeSalesorderComponent;
  let fixture: ComponentFixture<ResumeSalesorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeSalesorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeSalesorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
