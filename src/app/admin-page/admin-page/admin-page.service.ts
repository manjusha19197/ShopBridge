import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminPageService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';
  
  addNewMovie(newMovieForm: any): Observable<any> {
    return this.http.post(this.baseUrl + '/addMovieDetails' , newMovieForm , {responseType: 'text'})
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
   }

   getAllMovies(): Observable<any> {
    return this.http.get(this.baseUrl + '/getAllMoviesDetails')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
}

deleteMovie(id: any): Observable<any> {
  return this.http.delete(this.baseUrl + '/deleteMovieDetails/' + id , {responseType: 'text'})
  .pipe(
    retry(1),
    catchError(this.handleError)
  );
}

getMovie(id: any): Observable<any> {
  return this.http.get(this.baseUrl + '/getMovieById/' + id )
  .pipe(
    retry(1),
    catchError(this.handleError)
  );
}

updateMovie(updateMovieForm: any): Observable<any> {
  return this.http.put(this.baseUrl + '/editMovieDetails' , updateMovieForm , {responseType: 'text'})
  .pipe(
    retry(1),
    catchError(this.handleError)
  );
}

handleError(err: HttpErrorResponse) {
  let errorMessage = "";
  let obj = JSON.parse(err.error);
  if (obj.message) {
    errorMessage = `Error: ${err.error.message}`;
  }
  return throwError(errorMessage);
}
  }