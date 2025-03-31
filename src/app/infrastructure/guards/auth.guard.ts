import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';

export const authGuard: CanActivateChildFn = () => {
  const singedIn = inject(AuthService).isSingedIn;
  if (singedIn) {
    return true;
  }
  inject(Router).navigate(['/login']);
  return false;
}
