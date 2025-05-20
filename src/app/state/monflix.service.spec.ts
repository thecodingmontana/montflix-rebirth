import { TestBed } from '@angular/core/testing';

import { MonflixService } from './monflix.service';

describe('MonflixService', () => {
  let service: MonflixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonflixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
