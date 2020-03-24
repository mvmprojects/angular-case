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

  const dummyTrackListResponse: Track[] = [];

  const dummyTrack = {
    name: 'name'
  }

  it('getByAlbumId should take an id and return data', () => {
    service.getByAlbumId(1).subscribe((res) => {
      expect(res).toEqual(dummyTrackListResponse);
    });
    const testRequest = httpMock.expectOne('http://localhost:8080/track/byalbumid/1');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush(dummyTrackListResponse);
  });  

  it('postTrackDto should return data and use http method post', () => {
    service.postTrackDto(<Track>dummyTrack).subscribe((res) => {
      expect(res).toEqual(<Track>dummyTrack);
    });
    const testRequest = httpMock.expectOne('http://localhost:8080/track/');
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush(<Track>dummyTrack);
  });

  it('updateTrack should return data and use http method put', () => {
    service.updateTrack(<Track>dummyTrack).subscribe((res) => {
      expect(res).toEqual(<Track>dummyTrack);
    });
    const testRequest = httpMock.expectOne('http://localhost:8080/track/');
    expect(testRequest.request.method).toBe('PUT');
    testRequest.flush(<Track>dummyTrack);
  });

  it('deleteTrack method should take an id and use http method delete', () => {
    service.deleteTrack(1).subscribe((res) => {
      expect(res).toEqual(<Track>dummyTrack);
    });
    const testRequest = httpMock.expectOne('http://localhost:8080/track/1');
    expect(testRequest.request.method).toBe('DELETE');
    testRequest.flush(<Track>dummyTrack);
  });  
});
