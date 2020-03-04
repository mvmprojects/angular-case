import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Track } from '../model/track';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  apiUrl = environment.apiUrl;

  constructor(
    public http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // getTracksByAlbum(id: number): Observable<Track[]> {
  //   return this.http.get<Track[]>(this.apiUrl + `track/byalbumid`);
  // }

  // getTrackById(id: number): Observable<Track> {
  //   const url = `${this.apiUrl + `track`}/${id}`;
  //   return this.http.get<Track>(url);
  // }

  // postTrackDto(track: Track) {
  //   return this.http.post(this.apiUrl + 'track/create/', track, { observe: 'response' });
  // }
}
