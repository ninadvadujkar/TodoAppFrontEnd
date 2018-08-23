import { TestBed, inject } from '@angular/core/testing';

import { ProcessHttprespService } from './process-httpresp.service';

describe('ProcessHttprespService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessHttprespService]
    });
  });

  it('should be created', inject([ProcessHttprespService], (service: ProcessHttprespService) => {
    expect(service).toBeTruthy();
  }));
});
