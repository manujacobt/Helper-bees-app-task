import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usernameSubject = new BehaviorSubject<string | null>(this.getUsernameFromLocalStorage());
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private getUsernameFromLocalStorage(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('username');
    }
    return null;
  }

  fetchUserProfile(token: string): void {
    if (!this.isBrowser()) return;

    this.usernameSubject.next('Loading...');

    this.http.get<any>('https://dummyjson.com/users/1', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .subscribe(
      data => {
        console.log(data);
        const username = `${data.firstName} ${data.lastName}`;
        localStorage.setItem('username', username);
        this.usernameSubject.next(username);
      },
      error => console.error('Failed to fetch user data:', error)
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      this.usernameSubject.next(null);
    }
  }
}
