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
  selectionTotal = { album: this.selectedAlbum, artist: this.selectedArtist };

  handleReceivedArtist(artist: Artist) {
    this.selectedArtist = artist;
    this.selectedAlbum = null; // clear when selecting a new artist
    this.selectionTotal = { album: null, artist: null };
  }

  handleReceivedAlbum(album: Album) {
    this.selectedAlbum = album;    
    this.selectionTotal = { album: this.selectedAlbum, artist: this.selectedArtist };
  }
}
