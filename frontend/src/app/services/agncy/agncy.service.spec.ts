import { TestBed } from '@angular/core/testing';

import { AgncyService } from './agncy.service';

describe('AgncyService', () => {
  let service: AgncyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgncyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
