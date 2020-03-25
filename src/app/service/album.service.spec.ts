import { TestBed, inject, async, getTestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Album } from '../model/album';

describe('AlbumService', () => {
	let injector: TestBed;
  let service: AlbumService;
  let httpMock: HttpTestingController;  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService]      
    });
    injector = getTestBed();
    service = injector.get(AlbumService);
    httpMock = injector.get(HttpTestingController);    
  });

  it('should be created', () => {
    const service: AlbumService = TestBed.get(AlbumService);
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  const dummyAlbumListResponse: Album[] = [];

  it('getByArtistId should return data', () => {
    service.getByArtistId(1).subscribe((res) => {
      expect(res).toEqual(dummyAlbumListResponse);
    });
    const req = httpMock.expectOne('http://localhost:8080/album/byartistid/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyAlbumListResponse);
  });
});
