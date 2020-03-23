import { TestBed, inject, async, getTestBed } from '@angular/core/testing';

import { TrackService } from './track.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Track } from '../model/track';

describe('TrackService', () => {
	let injector: TestBed;
  let service: TrackService;
  let httpMock: HttpTestingController;  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrackService]      
    });
    injector = getTestBed();
    service = injector.get(TrackService);
    httpMock = injector.get(HttpTestingController);    
  });

  it('should be created', () => {
    const service: TrackService = TestBed.get(TrackService);
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  const dummyTrackListResponse: Track[] =
  [
    {
      id: 1, name: 'a', duration: 1, albumId: 1, albumName: 'a', artistId: 1, artistName: 'a'
    },
    {
      id: 2, name: 'a', duration: 1, albumId: 1, albumName: 'a', artistId: 1, artistName: 'a'
    }
  ];

  it('getByAlbumId should return data', () => {
    service.getByAlbumId(1).subscribe((res) => {
      expect(res).toEqual(dummyTrackListResponse);
    });
    const req = httpMock.expectOne('http://localhost:8080/track/byalbumid/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTrackListResponse);
  });  

  // postTrackDto

  // updateTrack

  // deleteTrack
});
