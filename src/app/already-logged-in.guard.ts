import { CanActivateFn, Router } from '@angular/router';

export const alreadyLoggedInGuard: CanActivateFn = (route, state) => {
  const router = new Router(); 
  const accessToken = typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null;

  if (accessToken) {
    router.navigate(['/intro']); 
    return false;
  }
  
  return true;
};
