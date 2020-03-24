import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../../data.service';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Artist } from '../../model/artist';
import { of } from 'rxjs';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let mockDataService: DataService;
  let mockEvent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        AppMaterialModule
      ],            
      declarations: [ SearchBarComponent ],
      providers: [ DataService ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockEvent = jasmine.createSpyObj(['emit'])
    component.onArtistSelection = mockEvent;    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the emitter in the selection handler', () => {
    const artist = new Artist(1,'a');
    spyOn(component, 'handleSelected').and.callThrough();
    mockEvent.emit.and.returnValue(of(true));
    component.handleSelected(artist);
    expect(mockEvent.emit).toHaveBeenCalled();
  })

});
