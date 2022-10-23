import { TestBed } from '@angular/core/testing';

import { PerfilPhotoProxysService } from './perfil-photo-proxys.service';

describe('PerfilPhotoProxysService', () => {
  let service: PerfilPhotoProxysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilPhotoProxysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
