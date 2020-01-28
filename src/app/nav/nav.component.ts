import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private username: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  getLoginState(): boolean{
    return this.authService.getState();
  }

  getAdminState():boolean{
    return this.authService.getAdmin();
  }


  navLogout(){
    this.authService.logout();
  }

  getUsername(){
  return this.username = this.authService.getUsername();
    
  }
}
