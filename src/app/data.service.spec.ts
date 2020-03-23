import { TestBed, inject, async, getTestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Artist, IArtistResponse } from './model/artist';

describe('DataService', () => {
	let injector: TestBed;
  let service: DataService;
  let httpMock: HttpTestingController;    
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]      
    });
    injector = getTestBed();
    service = injector.get(DataService);
    httpMock = injector.get(HttpTestingController);    
  });

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });    

  const aList: Artist[] =
  [
    {
      id: 1, name: 'abc'
    },
    {
      id: 2, name: 'cba'
    }
  ];

  const aResp: IArtistResponse = {
    total: 2,
    results: aList
  }

  it('search should return data via artist/getlist/', () => {
    service.search({ name: 'a' }).subscribe((res) => {
      expect(res).toEqual(aResp);
    });
    const req = httpMock.expectOne('http://localhost:8080/artist/getlist/');
    expect(req.request.method).toBe('GET');
    req.flush(aResp);
  });  
});
