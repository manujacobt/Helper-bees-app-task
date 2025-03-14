import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const accessToken = typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null;
  if (!accessToken) {
    router.navigate(['/login']);
    return of(false);
  }

  return authService.validateToken(accessToken).pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
