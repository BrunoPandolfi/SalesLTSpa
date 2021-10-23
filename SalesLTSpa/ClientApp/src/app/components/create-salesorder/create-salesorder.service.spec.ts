import { TestBed } from '@angular/core/testing';

import { CreateSalesorderService } from './create-salesorder.service';

describe('CreateSalesorderService', () => {
  let service: CreateSalesorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSalesorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
