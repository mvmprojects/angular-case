import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackComponent } from './add-track.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('AddTrackComponent', () => {
  let component: AddTrackComponent;
  let fixture: ComponentFixture<AddTrackComponent>;
  let fakeRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        AppMaterialModule
      ],      
      declarations: [ AddTrackComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrackComponent);
    component = fixture.componentInstance;

    fakeRef = jasmine.createSpyObj(['close']);
    component.dialogRef = fakeRef;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close() in method closeDialog()', () => {
    fakeRef.close.and.returnValue(of(true));
    component.closeDialog();
    expect(fakeRef.close).toHaveBeenCalled();    
  })  
});
