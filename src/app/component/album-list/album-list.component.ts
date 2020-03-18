import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Artist } from '../../model/artist';
import { Album } from '../../model/album';
import { AlbumService } from '../../service/album.service';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  @Input() inputArtist: Artist;
  @Output() clickEvent = new EventEmitter();
  artistText: string;
  albumList: Album[];
  isLoading = true;

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.artistText = 'No artist selected';
  }

  ngOnChanges() {
    if (this.inputArtist) {
      this.getAlbums(this.inputArtist.id) 
      this.artistText = 'Albums by ' + this.inputArtist.name;
    }
  }

  getAlbums(id: number): void {
    this.albumService.getByArtistId(id)
    .pipe(
      catchError(error => {
        throw error;
      }),
      finalize(() => {
        this.isLoading = false;
      })
    )    
    .subscribe(albums => this.albumList = albums);
  }

  handleClick(album: Album) {
    this.clickEvent.emit('test ' + album.name);
  }

}
