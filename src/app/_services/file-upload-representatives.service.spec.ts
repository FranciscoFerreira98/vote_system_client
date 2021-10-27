import { TestBed } from '@angular/core/testing';

import { FileUploadRepresentativeService } from './file-upload-representatives.service';

describe('FileUploadRepresentativesService', () => {
  let service: FileUploadRepresentativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadRepresentativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
