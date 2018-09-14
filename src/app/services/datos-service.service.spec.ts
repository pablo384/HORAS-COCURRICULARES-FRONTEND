import { TestBed, inject } from '@angular/core/testing';

import { DatosServiceService } from './datos-service.service';

describe('DatosServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatosServiceService]
    });
  });

  it('should be created', inject([DatosServiceService], (service: DatosServiceService) => {
    expect(service).toBeTruthy();
  }));
});
