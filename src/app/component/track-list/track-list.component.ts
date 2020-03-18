import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../model/album';
import { TrackService } from '../../service/track.service';
import { Track } from '../../model/track';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {

  @Input() selectedAlbum: Album;
  trackList: Track[];
  albumText: string;
  isLoading = true;

  constructor(private trackService: TrackService) { }

  ngOnInit() {
    this.albumText = 'No album selected';    
  }

  ngOnChanges() {

  }

  getTracks(id: number): void {
    this.trackService.getByAlbumId(id)
    .subscribe(tracks => this.trackList = tracks);
  }

}
