import { TestBed } from '@angular/core/testing';

import { AssignmentDialogService } from './assignment-dialog.service';

describe('AssignmentDialogService', () => {
  let service: AssignmentDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
