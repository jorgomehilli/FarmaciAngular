import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private username: string;
  number$: Observable<number>;

  constructor(private authService: AuthService,
    private cartService: CartService) { }

  ngOnInit() {
    //this.cartService.getCartItemsNumber().subscribe(data =>{console.log(data);})
    if(this.authService.getState())
    this.cartService.getCartItemsNumber();
  }

  public getCurrentItemsNumber() {
    return this.cartService.itemsNumberObservable().pipe(map(data => { return data as number }));
  }

  getLoginState(): boolean {
    return this.authService.getState();
  }

  getAdminState(): boolean {
    return this.authService.getAdmin();
  }


  navLogout() {
    this.authService.logout();
  }

  getUsername() {
    return this.username = this.authService.getUsername();

  }
}
