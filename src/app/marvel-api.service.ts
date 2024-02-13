import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Character, Comic } from './interfaces/marvel-interfaces';
import { Observable, map, catchError, throwError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {
  private apiKey:string = '3b618f34d6259a442737554c36d4421b'
  constructor(private http: HttpClient) { }
  baseUrl = 'https://gateway.marvel.com/v1/public/'
  characterName = signal('');

  searchCharacters(characterName: string): Observable<Character[]> {
    console.log("calling api with " + characterName);
    return this.http.get<any>(this.baseUrl + 'characters?nameStartsWith=' + characterName + '&apikey=' + this.apiKey)
    .pipe(
      map( response => {
        return response.data.results;
     } ),
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getCharacter(id: number): Observable<Character> {
    console.log("calling getCharacters with " + id);
    return this.http.get<any>(this.baseUrl + 'characters/' + id + '?apikey=' + this.apiKey)
    .pipe(
      map( response => {
        return response.data.results[0];
     } ),
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getComics(id: number, offset:number): Observable<Comic[]> {
    console.log("calling getComics with " + id);
    return this.http.get<any>(this.baseUrl + 'characters/' + id + '/comics?orderBy=title&limit=20&offset=' + offset + '&apikey=' + this.apiKey)
      .pipe(
        map (response => {
          return response.data.results;
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  getComic(id:number): Observable<Comic> {
    return this.http.get<any>(this.baseUrl + 'comics/' + id + '?apikey=' + this.apiKey)
      .pipe(
        map(response => {
          return response.data.results[0];
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  getComicCharacters(id: number): Observable<Character[]> {
    console.log("calling getComicCharacters with " + id);
    return this.http.get<any>(this.baseUrl + 'comics/' + id + '/characters?apikey=' + this.apiKey)
      .pipe(
        map (response => {
          return response.data.results;
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Unknown error; please try again later.'));
  }

}
