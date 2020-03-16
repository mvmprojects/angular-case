import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../model/album';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {

  @Input() selectedAlbum: Album;

  constructor() { }

  ngOnInit() {
  }

}
