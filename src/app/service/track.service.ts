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

  getByAlbumId(id: number): Observable<Track[]> {
    const url = `${this.apiUrl + `byalbumid`}/${id}`;
    return this.http.get<Track[]>(url).pipe(
      catchError(this.handleError<Track[]>(`was fetching by album id=${id}`))
    );
  }  

  postTrackDto(track: Track): Observable<Track> {
    return this.http.post<Track>(this.apiUrl, track)
    .pipe(
      catchError(this.handleError<Track>(`postTrackDto`, track))
    );
  }  

  updateTrack(track: Track): Observable<Track> {
    return this.http.put<Track>(this.apiUrl, track)
    .pipe(
      catchError(this.handleError<Track>(`updateTrack`, track))
    );
  }    

  deleteTrack(id: number): Observable<{}> {
    const url = this.apiUrl + id;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deleteTrack'))
      );
  }  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // App continues to run by returning an empty result.
      return of(result);
    };
  }  
}
