import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Track } from '../model/track';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  apiUrl = environment.apiUrl + 'track/';

  constructor(
    public http: HttpClient) { }

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  getByAlbumId(id: number): Observable<Track[]> {
    const url = `${this.apiUrl + `byalbumid`}/${id}`;
    return this.http.get<Track[]>(url).pipe(
      catchError(this.handleError<Track[]>(`was fetching by album id=${id}`))
    );
  }  

  // getTrackById(id: number): Observable<Track> {
  //   const url = `${this.apiUrl + `track`}/${id}`;
  //   return this.http.get<Track>(url);
  // }

  // postTrackDto(track: Track) {
  //   return this.http.post(this.apiUrl + 'track/create/', track, { observe: 'response' });
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // App continues to run by returning an empty result.
      return of(result);
    };
  }  
}
