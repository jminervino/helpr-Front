import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean {
    return this.isAuthorized();
  }

  private isAuthorized(): boolean {
    const requiredRole = 'ADMIN';
    if (this.authService.roleUser?.toUpperCase() !== requiredRole) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}