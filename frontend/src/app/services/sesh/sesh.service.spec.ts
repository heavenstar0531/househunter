import { TestBed } from '@angular/core/testing';

import { SeshService } from './sesh.service';

describe('SeshService', () => {
  let service: SeshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
