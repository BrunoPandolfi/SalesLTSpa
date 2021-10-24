import { TestBed } from '@angular/core/testing';

import { SalesOrderResolver } from './sales-order.resolver';

describe('SalesOrderResolver', () => {
  let resolver: SalesOrderResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SalesOrderResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
