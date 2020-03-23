import { Component, OnInit, Inject, Input } from '@angular/core';
import { Track } from '../../model/track';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.css']
})
export class EditTrackComponent implements OnInit {
  
  trackName: string;
  trackMinutes: number;
  trackSeconds: number;

  constructor(
    public dialogRef: MatDialogRef<EditTrackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.trackName = this.data.name;
    this.trackMinutes = this.data.minutes;
    this.trackSeconds = this.data.seconds;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log('data received in dialog: ', this.data);    
  }

}
