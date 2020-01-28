import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
         private router: Router,
         private snackBar: MatSnackBar) { }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        let flag = true;

        return this.authService.isAuthenticated().pipe(
            map(authenticated => {
                console.log(authenticated);
                if (!authenticated) {
                    console.log(authenticated);
                    this.snackBar.open('Login first!','OK',{ 
                        duration: 5000});
                    flag = false;

                    this.router.navigate(['/authentication']);
                }
            }), map(() => flag));
    }
}