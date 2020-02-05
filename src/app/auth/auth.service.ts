import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {

    public isLoggedIn = false;
    private role: string = '';
    private isAdmin;
    private actualUserId: number;
    private username: string;
    private helper = new JwtHelperService();

    constructor(private http: HttpClient,
        private snackBar: MatSnackBar) {
    }

    recieveUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:3000/users');
    }

    signUp(formValue: any) {
        return this.http.post('http://localhost:8787/users/signup', formValue);
    }

    authenticate(formValue: any) {
        return this.http.post('http://localhost:8787/authenticate',
            { "username": formValue.email, "password": formValue.password });
                        
    }

    isAuthenticated() {

        const authObservable = Observable.create(observer => {
            observer.next(this.isLoggedIn);
        });
        return authObservable;
    }

    isAdminObservable() {

        const adminObservable = Observable.create(observer => {
            observer.next(this.isAdmin);
        });
        return adminObservable;
    }



    login(user: User) {
        this.actualUserId = user.id;
        this.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
        localStorage.setItem('userId', JSON.stringify(user.id));
        localStorage.setItem('username', JSON.stringify(user.firstname));


        if (this.role == 'admin') {
            this.isAdmin = true;
            localStorage.setItem('isAdmin', JSON.stringify(this.isAdmin));
        }

    }

    logout() {

        this.actualUserId = null;
        this.isLoggedIn = false;
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');

        if (localStorage.getItem('isAdmin') !== null) {
            localStorage.removeItem('isAdmin');
            this.isAdmin = false;
        }
        this.snackBar.open('Successfully logged out!', '', {
            duration: 3000
        });
    }

    getState(): boolean {

        let token = localStorage.getItem('token');
        if(token && !this.helper.isTokenExpired(token))
        return true;
        else
        return false;

        // return false;

        // if (localStorage.getItem('isLoggedIn') == null) {
        //     this.isLoggedIn = false;
        // } else {
        //     this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        // }
        // return this.isLoggedIn;
    }

    getRole() {
        return this.role;
    }

    getAdmin(): boolean {

        // let token = localStorage.getItem('token');
        // let tokenPayload = this.helper.decodeToken(token);
        // let role = JSON.parse(JSON.stringify(tokenPayload.role[0].authority));

        // if(token && !this.helper.isTokenExpired(token)) {
        //     if(role == 'ROLE_ADMIN')
        //     return true;
        // }else return false;
        
        return false;
    
        



        // if (localStorage.getItem('isAdmin') == null) {
        //     this.isAdmin = false;
        // } else {
        //     this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
        // }

        // return this.isAdmin;
    }

    deleteUserFromDb(user: User): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/users/${user.id}`);
    }

    updateUser(user: any) {
        return this.http.put<any>(`http://localhost:3000/users/${user.id}`, user);
    }

    getActualUserId() {

        this.actualUserId = JSON.parse(localStorage.getItem('userId'));
        if (this.getActualUserId !== null)
            return this.actualUserId;
    }
    getUsername() {
        this.username = localStorage.getItem('username');
        return this.username;
    }
}
