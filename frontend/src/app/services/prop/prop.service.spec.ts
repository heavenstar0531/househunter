import { TestBed } from '@angular/core/testing';

import { PropService } from './prop.service';

describe('PropService', () => {
  let service: PropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
