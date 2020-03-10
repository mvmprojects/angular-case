import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Artist, IArtistResponse } from './model/artist';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  search(filter: {name: string} = {name: ''}, page = 1): Observable<IArtistResponse> {
    return this.http.get<IArtistResponse>(this.apiUrl + '/artist/findAll/') //
    .pipe(
      tap((response: IArtistResponse) => {
        response.results = response.results
          .map(artist => new Artist(artist.id, artist.name))
          .filter(artist => artist.name.includes(filter.name))

        return response;
      }),
      catchError(this.handleError<IArtistResponse>('/artist/findAll/'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // App continues to run by returning an empty result.
      return of(result);
    };
  }

  // getArtists(): Observable<Artist[]>{
  //   return this.http.get<Artist[]>(this.postUrl);
  // }  
}
