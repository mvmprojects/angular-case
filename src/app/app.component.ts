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

  handleReceivedArtist(data) {
    console.log('received artist: ', data)
  }

  handleReceivedAlbum(data) {
    console.log('received album: ', data);
  }
}
