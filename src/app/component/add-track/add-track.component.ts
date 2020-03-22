import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../../model/track';

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.css']
})
export class AddTrackComponent implements OnInit {

  model: Track;

  newTrack() {
    this.model = new Track();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
