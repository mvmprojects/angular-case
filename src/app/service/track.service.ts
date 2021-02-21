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

  apiUrl = environment.apiUrl; // + 'track/';

  constructor(
    public http: HttpClient) { }

  constructUrl(albumId: number): string {
    const myUrl = `${this.apiUrl + `albums`}/${albumId}/tracks`;
    return myUrl;
  }

  getByAlbumId(id: number): Observable<Track[]> {
    // const url = `${this.apiUrl + `byalbumid`}/${id}`;
    const url = this.constructUrl(id);
    return this.http.get<Track[]>(url).pipe(
      catchError(this.handleError<Track[]>(`was fetching by album id=${id}`))
    );
  }  

  postTrackDto(track: Track): Observable<Track> {
    const url = this.constructUrl(track.parentId);
    return this.http.post<Track>(url, track)
    .pipe(
      catchError(this.handleError<Track>(`postTrackDto`, track))
    );
  }  

  updateTrack(track: Track): Observable<Track> {
    const url = this.constructUrl(track.parentId) + '/' + track.trackId;
    return this.http.put<Track>(url, track)
    .pipe(
      catchError(this.handleError<Track>(`updateTrack`, track))
    );
  }    

  deleteTrack(track: Track): Observable<{}> {
    const url = this.constructUrl(track.parentId) + '/' + track.trackId;
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
