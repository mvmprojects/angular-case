import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../model/album';
import { TrackService } from '../../service/track.service';
import { Track } from '../../model/track';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {

  @Input() inputAlbum: Album;
  trackList: Track[];
  albumText: string;
  isLoading = true;

  constructor(private trackService: TrackService) { }

  ngOnInit() {
    this.albumText = 'No album selected';    
  }

  ngOnChanges() {
    if (this.inputAlbum) {
      this.getTracks(this.inputAlbum.id) 
      this.albumText = 'Tracks on album: ' + this.inputAlbum.name;
    }
  }

  getTracks(id: number): void {
    this.isLoading = true;
    this.trackService.getByAlbumId(id)
    .pipe(
      catchError(error => {
        throw error;
      }),
      finalize(() => {
        this.isLoading = false;
      })
    )        
    .subscribe(tracks => this.trackList = tracks);
  }

  addTrack() {

  }

  editTrack(track: Track) {

  }

  deleteTrack(track: Track) {
    this.trackService.deleteTrack(track.id)
    .pipe(
      catchError(error => {
        throw error;
      }),
      finalize(() => {
        this.getTracks(this.inputAlbum.id);
      })
    )        
    .subscribe();
  }

}
