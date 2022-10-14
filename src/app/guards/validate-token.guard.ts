import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate')
    return this.authService.verifyToken()
      .pipe(
        tap(res => res || this.router.navigateByUrl('auth/login'))
      );
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canLOad')
    return this.authService.verifyToken()
      .pipe(
        tap(res => res || this.router.navigateByUrl('auth/login'))
      );
  }
}
