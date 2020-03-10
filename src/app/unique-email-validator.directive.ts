import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Directive({
  selector: '[UniqueEmail]'
})
export class UniqueEmailValidatorDirective implements AsyncValidator {

  constructor(private authService: AuthService) {}

  validate(control: AbstractControl): Promise <ValidationErrors| null> | Observable <ValidationErrors | null>{
    return this.authService.isEmailUnique(control.value).pipe(
      map( users =>{
        return users != null ? {'UniqueEmail': true} : null
      })
    );
  }

}
