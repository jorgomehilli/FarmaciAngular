import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { CartService } from 'src/app/cart/cart.service';
import { Router } from '@angular/router';
import { UniqueEmailValidatorDirective } from 'src/app/unique-email-validator.directive';
import { Observable, timer } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private authService: AuthService,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private router: Router) {

  }

  ngOnInit() {

    this.signupForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email],[this.usernameValidator()]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }


  onSubmit(){
    this.authService.signUp(this.signupForm.value).subscribe((user: any) =>{
      console.log(user);
      this.signupForm.reset();      
      this.snackBar.open("Successfully registered !" , "", {duration: 3000});
      this.router.navigate(['/login']);      
    });
  }
  

  usernameValidator(): AsyncValidatorFn  {
    return (control: AbstractControl): Observable<{[key: string]: any | null}> => {


return timer(1000).pipe(switchMap(()=>{
      return this.authService.isEmailUnique(control.value).pipe(delay(750)).pipe(
      map(res => {
        // if res is true, username exists, return true
        return res ? { usernameExists: true } 
        : null;
        // NB: Return null if there is no error
      })
     );

}));
      
    // return this.authService.isEmailUnique(control.value).pipe(delay(750)).pipe(
    //   map(res => {
    //     // if res is true, username exists, return true
    //     return res ? { usernameExists: true } 
    //     : null;
    //     // NB: Return null if there is no error
    //   })
    //  );
    }
  }
  
  
  // onSubmit() {
  //   if(this.signupForm.valid)
  //   {
  //   this.authService.recieveUsers().subscribe((usersResponse) => {
  //     if (usersResponse.filter(user => user.email === this.signupForm.value.email).length) {
  //       this.snackBar.open('User with this email already exists!','OK',{ 
  //         duration: 3000});
  //     } else 
  //       this.authService.signUp(this.signupForm.value).subscribe((responseData: User) => {
  //         console.log(responseData);
  //         this.snackBar.open('You have successfully registered!','',{ 
  //           duration: 3000});
  //         this.signupForm.reset();
  //       })
      
  //   })
  // } else{
  //    this.snackBar.open('Please fill in all the fields!', '', {duration:3000}); }
  // }
}
