import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Artist } from '../../model/artist';
import { Album } from '../../model/album';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  @Input() inputArtist: Artist;
  @Output() clickEvent = new EventEmitter();
  albumText: string;

  constructor() { }

  ngOnInit() {
    this.albumText = 'No artist selected';
  }

  ngOnChanges() {
    if (this.inputArtist) {
      this.albumText = 'Albums by ' + this.inputArtist.name;
    }
  }

  handleClick() {
    this.clickEvent.emit('test');
  }

}
