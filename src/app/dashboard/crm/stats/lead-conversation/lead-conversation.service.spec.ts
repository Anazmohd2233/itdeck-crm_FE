import { TestBed } from '@angular/core/testing';

import { LeadConversationService } from './lead-conversation.service';

describe('LeadConversationService', () => {
  let service: LeadConversationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadConversationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
