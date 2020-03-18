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
    console.log('received artist: ', artist)
    this.selectedArtist = artist;
  }

  handleReceivedAlbum(album: Album) {
    console.log('received album: ', album);
    this.selectedAlbum = album;    
  }
}
