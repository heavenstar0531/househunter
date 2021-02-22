import { TestBed } from '@angular/core/testing';

import { AccService } from './acc.service';

describe('AccService', () => {
  let service: AccService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
