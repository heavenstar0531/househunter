import { TestBed } from '@angular/core/testing';

import { ConvService } from './conv.service';

describe('ConvService', () => {
  let service: ConvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
