import { TestBed } from '@angular/core/testing';

import { PerfilPhotoService } from './perfil-photo.service';

describe('PerfilPhotoService', () => {
  let service: PerfilPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
