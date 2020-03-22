import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../model/album';
import { TrackService } from '../../service/track.service';
import { Track } from '../../model/track';
import { catchError, finalize } from 'rxjs/operators';
import { EditTrackComponent } from '../edit-track/edit-track.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(
    private trackService: TrackService,
    private _dialog: MatDialog
  ) { }

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
    // this.trackService.postTrackDto(track)
    // .pipe(
    //   catchError(error => {
    //     throw error;
    //   }),
    //   finalize(() => {
    //     this.getTracks(this.inputAlbum.id);
    //   })
    // )        
    // .subscribe();    
  }

  editTrack(track: Track) {
    const mappedTrack = this.mapTrackToEditable(track);
    // open modal
    const dialogRef = this._dialog.open(EditTrackComponent, {
      width: '360px',
      data: mappedTrack
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if (result) {
        // this.dataSource.data[result.position - 1] = result
        // this.dataSource._updateChangeSubscription();
      }
    });    

    // this.trackService.updateTrack(track)
    // .pipe(
    //   catchError(error => {
    //     throw error;
    //   }),
    //   finalize(() => {
    //     this.getTracks(this.inputAlbum.id);
    //   })
    // )        
    // .subscribe();    
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

  formatMillis(millis) {
    // format to mm:ss
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return (parseInt(seconds) == 60 ? (minutes+1) + ":00" : minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds);
  }

}
