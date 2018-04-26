import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PEOPLE } from './mock-people';
import { Person } from './person';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  getHeros(): Observable<Person[]> {
    return this.http.get<Person[]>(this.heroesUrl)
      .pipe(
        tap(() => this.log('fetched heros')),
        catchError(this.handleError<Person[]>('getHeros', []))
      );
  }

  getHero(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(() => this.log('fetched hero id= ' + id)),
        catchError(this.handleError<Person>('getHero', null))
      );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Person[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Person[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Person[]>('searchHeroes', []))
    );
  }

  updateHero(hero: Person): Observable<Person> {
    return this.http.put<Person>(`${this.heroesUrl}/${hero.id}`, hero, httpOptions)
      .pipe(
        tap(() => this.log('updated hero id= ' + hero.id)),
        catchError(this.handleError<Person>('updateHero', null))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
