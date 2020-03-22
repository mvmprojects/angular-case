import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../../model/track';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.css']
})
export class AddTrackComponent implements OnInit {

  trackName: string;
  trackMinutes: number;
  trackSeconds: number;

  constructor(
    public dialogRef: MatDialogRef<AddTrackComponent>    
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }  

  ngOnInit(): void {
  }

}
