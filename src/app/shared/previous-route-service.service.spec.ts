import { TestBed, inject } from '@angular/core/testing';

import { PreviousRouteServiceService } from './previous-route-service.service';

describe('PreviousRouteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreviousRouteServiceService]
    });
  });

  it('should be created', inject([PreviousRouteServiceService], (service: PreviousRouteServiceService) => {
    expect(service).toBeTruthy();
  }));
});
