import { TestBed } from '@angular/core/testing';

import { TemplateEventEmitterService } from './template-event-emitter.service';

describe('TemplateEventEmitterService', () => {
  let service: TemplateEventEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateEventEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
