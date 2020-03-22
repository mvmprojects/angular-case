import { Component, OnInit, Inject, Input } from '@angular/core';
import { Track } from '../../model/track';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.css']
})
export class EditTrackComponent implements OnInit {

  // trackForm: FormGroup;
  
  trackName: string;
  trackMinutes: number;
  trackSeconds: number;

  constructor(
    // private formb: FormBuilder,
    public dialogRef: MatDialogRef<EditTrackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.trackName = this.data.name;
    this.trackMinutes = this.data.minutes;
    this.trackSeconds = this.data.seconds;
    // this.trackForm = formb.group({
    //   fName: ['', Validators.required],
    //   fMinutes: ['', [Validators.min(0), Validators.max(59)]] 
    // })    
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateTrack() {
  }

  ngOnInit(): void {
    console.log('data received in dialog: ', this.data);    
  }

}
