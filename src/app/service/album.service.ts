import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Album } from '../model/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  apiUrl: string = environment.apiUrl + 'album/';

  constructor(private http: HttpClient) {}

  getByArtistId(id: number): Observable<Album[]> {
    const url = `${this.apiUrl + `byartistid`}/${id}`;
    return this.http.get<Album[]>(url).pipe(
      catchError(this.handleError<Album[]>(`was fetching by artist id=${id}`))
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
