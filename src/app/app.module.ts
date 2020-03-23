import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AlbumListComponent } from './component/album-list/album-list.component';
import { TrackListComponent } from './component/track-list/track-list.component';
import { EditTrackComponent } from './component/edit-track/edit-track.component';
import { AddTrackComponent } from './component/add-track/add-track.component';
import { AppMaterialModule } from './app-material/app-material.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    AlbumListComponent,
    TrackListComponent,
    EditTrackComponent,
    AddTrackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,    
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditTrackComponent]
})
export class AppModule { }
