import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Artist, IArtistResponse } from '../../model/artist';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs'
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  isLoading = false;
  filteredArtists: Artist[] = [];
  mainForm: FormGroup;
  @Output() onArtistSelection = new EventEmitter();

  constructor(
    private fBuilder: FormBuilder, 
    private appService: DataService
  ) {}

  ngOnInit() {
    this.mainForm = this.fBuilder.group({
      userInput: null
    })

      this.mainForm
      .get('userInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.appService.search({name: value}, 1)
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(artists => this.filteredArtists = artists.results);    
  }

  handleSelected(artist: Artist) {
    console.log('selection from search-bar: ', artist)
    this.onArtistSelection.emit(artist);
  }  

  displayFunc(artist: Artist) {
    if (artist) return artist.name;
  }

}
