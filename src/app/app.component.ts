import { Component } from '@angular/core';
import { Artist } from './model/artist';
import { Album } from './model/album';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'case-app';
  selectedArtist: Artist;
  selectedAlbum: Album;

  handleReceivedArtist(artist: Artist) {
    this.selectedArtist = artist;
    this.selectedAlbum = null; // clear when selecting a new artist
  }

  handleReceivedAlbum(album: Album) {
    this.selectedAlbum = album;    
  }
}
