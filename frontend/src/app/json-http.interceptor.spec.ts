import { TestBed } from '@angular/core/testing';

import { JsonHttpInterceptor } from './json-http.interceptor';

describe('JsonHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JsonHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JsonHttpInterceptor = TestBed.inject(JsonHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
