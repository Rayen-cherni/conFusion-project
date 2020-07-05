import { TestBed } from '@angular/core/testing';

import { ProcessHTPPMsgService } from './process-htppmsg.service';

describe('ProcessHTPPMsgService', () => {
  let service: ProcessHTPPMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessHTPPMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
