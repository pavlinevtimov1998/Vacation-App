import { TestBed } from '@angular/core/testing';

import { AgencyAuthGuard } from './agency-auth.guard';

describe('AgencyAuthGuard', () => {
  let guard: AgencyAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AgencyAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
