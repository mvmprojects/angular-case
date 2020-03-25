import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumListComponent } from './album-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlbumService } from '../../service/album.service';
import { Artist } from '../../model/artist';
import { Album } from '../../model/album';
import { of } from 'rxjs';

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let mockAlbumService;
  let mockEvent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ AlbumListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {  
    mockAlbumService = jasmine.createSpyObj(['getByArtistId']);
    mockEvent = jasmine.createSpyObj(['emit'])
    component = new AlbumListComponent(mockAlbumService);    
    // needs an artist
    component.inputArtist = new Artist(1,'a');        
    component.clickEvent = mockEvent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAlbums in ngOnChanges and then call service method getByArtistId', () => {
    spyOn(component, 'getAlbums').and.callThrough();
    mockAlbumService.getByArtistId.and.returnValue(of(true));
    component.ngOnChanges();
    expect(component.getAlbums).toHaveBeenCalled();
    expect(mockAlbumService.getByArtistId).toHaveBeenCalled();
  })

  it('should call the emitter in the click handler', () => {
    const album = new Album;
    spyOn(component, 'handleClick').and.callThrough();
    mockEvent.emit.and.returnValue(of(true));
    component.handleClick(album);
    expect(mockEvent.emit).toHaveBeenCalled();
  })

});
