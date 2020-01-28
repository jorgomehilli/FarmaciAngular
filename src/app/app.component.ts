import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/state/app.state';
import { GetItems } from './store/actions/cart.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'farmaci';
  constructor(private cartService: CartService,
    private store: Store<AppState>){
  }
  
  ngOnInit(){
    //  this.store.dispatch(new GetItems);

  }
}
