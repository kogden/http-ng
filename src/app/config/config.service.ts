import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = 'assets/config.json';

  getConfig() {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // client side or network error occurred. handle accordingly
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code. response body may know what went wrong
      console.error(
        'Back end returned code ${error.status}, ' + 'body was: ${error.error}');
    }
    return throwError(
      'Something bad happened; please try again later');
  }

  constructor(private http: HttpClient) {
  }
}

