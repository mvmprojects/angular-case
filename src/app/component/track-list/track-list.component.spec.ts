import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackListComponent } from './track-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { Album } from '../../model/album';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Track } from '../../model/track';

describe('TrackListComponent', () => {
  let component: TrackListComponent;
  let mockTrackService;  
  let mockDialog;  
  let tracks;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppMaterialModule
      ],
      declarations: [ TrackListComponent ]
    }).compileComponents();
      tracks = [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 3, name: 'c' }
      ];
      mockTrackService = jasmine.createSpyObj(['getTracks', 'postTrackDto', 'updateTrack', 'deleteTrack']);
      mockDialog = jasmine.createSpyObj(['open']);
      component = new TrackListComponent(mockTrackService, mockDialog);
      // needs inputAlbum to be known so it can attach new track to this album
      const album = new Album();
      album.albumId = 1;      
      component.inputAlbum = album;      
  }));

  it('should create the TrackListComponent', () => {
    const fixture = TestBed.createComponent(TrackListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('deleteTrack', () => {
    it('should remove the indicated track from the track list', () => {
      mockTrackService.deleteTrack.and.returnValue(of(true));
      component.trackList = tracks;
      component.deleteTrack(tracks[2]);
      expect(component.trackList.length).toBe(2);
      expect(component.trackList[0].trackId).toBe(1);
      expect(component.trackList[1].name).toBe('b');
    });

    it('should call deleteTrack in service', () => {
      mockTrackService.deleteTrack.and.returnValue(of(true));
      component.trackList = tracks;
      component.deleteTrack(tracks[2]);
      expect(mockTrackService.deleteTrack).toHaveBeenCalledWith(tracks[2].id);
    });   
  });

  describe('addTrack', () => {
    it('should open a dialog and call the service method postTrackDto', () => {
      mockDialog.open.and.returnValue({afterClosed: () => of(Track)});
      mockTrackService.postTrackDto.and.returnValue(of(true));

      component.addTrack();
      expect(mockDialog.open).toHaveBeenCalled();
      expect(mockTrackService.postTrackDto).toHaveBeenCalled();      
    });
  });

  describe('editTrack', () => {
    it('should open a dialog and call the service method updateTrack', () => {
      const track = new Track();

      mockDialog.open.and.returnValue({afterClosed: () => of(Track)});
      mockTrackService.updateTrack.and.returnValue(of(true));

      component.editTrack(track);
      expect(mockDialog.open).toHaveBeenCalled();
      expect(mockTrackService.updateTrack).toHaveBeenCalled();
    });
  });  
});