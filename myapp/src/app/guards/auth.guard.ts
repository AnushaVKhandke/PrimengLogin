import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('email')){
    return true;
  }else{
    const route = inject(Router)
    return route.navigate(['/login'])
  }
};
