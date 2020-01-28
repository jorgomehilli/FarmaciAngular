import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable()

export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService,
         private router: Router,
         private snackBar: MatSnackBar) { }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        let flag = true;

        return this.authService.isAdminObservable().pipe(
            map(isAdmin => {
                if (!isAdmin) {
                    console.log(isAdmin);
                    this.snackBar.open('You are not an admin!','',{ 
                        duration: 3000});
                    flag = false;
                    this.router.navigate(['/home']);
                }
            }), map(() => flag));
    }
}