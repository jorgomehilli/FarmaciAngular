import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProductsService } from 'src/app/products/products.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-usersdialog',
  templateUrl: './usersdialog.component.html',
  styleUrls: ['./usersdialog.component.css']
})
export class UsersdialogComponent implements OnInit {

  userForm: FormGroup;
  isUpdate: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public user: any,
    private authService: AuthService,
    private matDialogRef: MatDialogRef<UsersdialogComponent>,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.user) {
      this.isUpdate = true;
      this.userForm = new FormGroup({
        'firstname': new FormControl(this.user.firstname, Validators.required),
        'lastname': new FormControl(this.user.lastname, Validators.required),
        'email': new FormControl(this.user.email, Validators.email),
        'password': new FormControl(this.user.password, Validators.minLength(6)),
        'role': new FormControl(this.user.role, Validators.required),
        'id': new FormControl(this.user.id, Validators.required)
      });

    }
    else {

      this.userForm = new FormGroup({
        'firstname': new FormControl(null, Validators.required),
        'lastname': new FormControl(null, Validators.required),
        'email': new FormControl(null, Validators.email),
        'password': new FormControl(null, Validators.minLength(6)),
        'role': new FormControl(null, Validators.required),
        'id': new FormControl(null, Validators.required)


      });
    }
  }

  onSubmit() {

    if(!this.userForm.valid) return;

    if (!this.isUpdate) {
      this.authService.signUp(this.userForm.value).subscribe((data) => {
        this.matDialogRef.close(true);
        this.snackBar.open('User added successfully!','',{duration:3000});
      },
        error => { console.log(error); });
    } else {
      this.authService.updateUser(this.userForm.value).subscribe(() => {
        this.matDialogRef.close(true);
        this.snackBar.open('User updated successfully!','',{duration:3000});

      },
        error => { console.log(error); });
    }
  }

  onClose(){
    this.matDialogRef.close(false);
  }

}
