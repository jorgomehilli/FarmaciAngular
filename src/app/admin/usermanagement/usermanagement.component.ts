import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UsersdialogComponent } from './usersdialog/usersdialog.component';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {

  private users: User[] = [];
  searchText: string;

  constructor(private authService: AuthService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.authService.recieveUsers().subscribe((usersResponse: User[]) => {
      this.users = usersResponse;
    });

  }


  addUser() {
    let dialogRef = this.dialog.open(UsersdialogComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(changed => {
      if (changed) {
        this.authService.recieveUsers()
          .subscribe(data => this.users = data);
      }
    });
  }
  
  updateUser(user: any){
    let dialogRef =this.dialog.open(UsersdialogComponent, {
      width: '40%',
      data: user
    });
    
    dialogRef.afterClosed().subscribe(changed => {
      if (changed) {
        this.authService.recieveUsers()
        .subscribe(data => this.users = data);
      }
    });
  }

  

  deleteUser(index) {
    this.authService.deleteUserFromDb(this.users[index]).subscribe(() => {
      this.users.splice(index, 1);
      this.snackBar.open('Successfully removed user!', '', {
        duration: 3000
      });
    },
      error => { console.log(error); });
  }

}

