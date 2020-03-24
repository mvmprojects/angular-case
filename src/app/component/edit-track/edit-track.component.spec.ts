import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrackComponent } from './edit-track.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('EditTrackComponent', () => {
  let component: EditTrackComponent;
  let fixture: ComponentFixture<EditTrackComponent>;
  let fakeRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        AppMaterialModule
      ],
      declarations: [ EditTrackComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrackComponent);
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
