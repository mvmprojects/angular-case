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
  albumTextInit = 'No album selected';
  isLoading = true;

  constructor(private trackService: TrackService) { }

  ngOnInit() {
    this.albumText = this.albumTextInit;    
  }

  ngOnChanges() {
    if (this.inputAlbum) {
      this.getTracks(this.inputAlbum.id) 
      this.albumText = 'Tracks on album: ' + this.inputAlbum.name;
    } else {
      this.albumText = this.albumTextInit;
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

  millisToMMSS(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return (parseInt(seconds) == 60 ? (minutes+1) + ":00" : minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds);
  }

}
