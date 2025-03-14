import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  validateToken(token: string): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/users/1', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      tap(data => {
        const username = `${data.firstName} ${data.lastName}`;
        localStorage.setItem('username', username);
      }),
      catchError(error => {
        console.error('Token validation failed:', error);
        return throwError(() => new Error('Token validation failed'));
      })
    );
  }
}
