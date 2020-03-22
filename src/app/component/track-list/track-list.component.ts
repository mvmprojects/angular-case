import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../model/album';
import { TrackService } from '../../service/track.service';
import { Track } from '../../model/track';
import { catchError, finalize } from 'rxjs/operators';
import { EditTrackComponent } from '../edit-track/edit-track.component';
import { MatDialog } from '@angular/material/dialog';
import { Artist } from '../../model/artist';
import { AddTrackComponent } from '../add-track/add-track.component';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {

  // @Input() inputAlbum: Album;
  @Input() inputs: {album: Album; artist: Artist}
  inputAlbum: Album;
  inputArtist: Artist;
  trackList: Track[];
  albumText: string;
  albumTextInit = 'No album selected';
  isLoading = true;

  constructor(
    private trackService: TrackService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.albumText = this.albumTextInit;
  }

  ngOnChanges() {
    console.log('test ', this.inputs)
    if (this.inputs.album) {
      this.inputAlbum = this.inputs.album;
      this.inputArtist = this.inputs.artist;      
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
    let newTrack = new Track();
    newTrack.albumId = this.inputAlbum.id,
    newTrack.albumName = this.inputAlbum.name,
    newTrack.artistName = this.inputArtist.name,
    newTrack.artistId = this.inputArtist.id

    const dialogRef = this._dialog.open(AddTrackComponent, {
      width: '360px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        newTrack.name = result.name;
        newTrack.duration = this.convertToMillis(result.minutes, result.seconds);
        this.trackService.postTrackDto(newTrack)
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
    });
  }

  editTrack(track: Track) {
    const mappedTrack = this.mapTrackToEditable(track);

    const dialogRef = this._dialog.open(EditTrackComponent, {
      width: '360px',
      data: mappedTrack
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        track.name = result.name;
        track.duration = this.convertToMillis(result.minutes, result.seconds);
        this.trackService.updateTrack(track)
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
    });
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

  mapTrackToEditable(track: Track) {
    const formattedMillis = this.formatMillis(track.duration);
    const minutes = parseInt(formattedMillis.substring(0,2));
    const seconds = parseInt(formattedMillis.substring(2));
    return {
      name: track.name,
      minutes: minutes,
      seconds: seconds
    }
  }

  convertToMillis(minutes: number, seconds: number): number {
    return (minutes * 60000) + (seconds * 1000);
  }

  formatMillis(millis) {
    // format to mm:ss
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return (parseInt(seconds) == 60 ? (minutes+1) + ":00" : minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds);
  }

}
