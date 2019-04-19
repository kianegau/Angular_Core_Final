import { TestBed } from '@angular/core/testing';

import { FaTubeService } from './fa-tube.service';

describe('FaTubeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaTubeService = TestBed.get(FaTubeService);
    expect(service).toBeTruthy();
  });
});
