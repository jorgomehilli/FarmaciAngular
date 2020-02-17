import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
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
        'firstname': new FormControl(this.user.firstName, Validators.required),
        'lastname': new FormControl(this.user.lastName, Validators.required),
        'email': new FormControl(this.user.email, Validators.email),
        'role': new FormControl(this.user.roles[0].name, Validators.required),
        'id': new FormControl(this.user.userId, Validators.required)
      });

    }
    else {

      this.userForm = new FormGroup({
        'firstname': new FormControl(null, Validators.required),
        'lastname': new FormControl(null, Validators.required),
        'email': new FormControl(null, Validators.email),
        'password': new FormControl(null, Validators.minLength(6)),
        'role': new FormControl("ROLE_USER", Validators.required)

      });
    }
  }

  onSubmit() {

    if(!this.userForm.valid) return;

    if (!this.isUpdate) {
      this.authService.addUser(this.userForm.value).subscribe((data) => {
        console.log(this.userForm.value);
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
