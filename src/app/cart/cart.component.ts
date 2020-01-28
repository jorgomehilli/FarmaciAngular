import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartdialogComponent} from '../cart/cartdialog/cartdialog.component';
import { AppState, initialAppState } from '../store/state/app.state';
import { GetItems, DeleteItem } from '../store/actions/cart.actions';
import { initialCartState } from '../store/state/cart.state';
import { selectUserList } from '../store/selectors/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  private newQuantity: number;
  private products: any[] = [];
  // products$ = this.store.pipe(select(selectUserList));

  constructor(private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private store: Store <AppState>
  ) { };

  ngOnInit() {
    // this.store.dispatch( new GetItems );
    this.cartService.getProducts(this.authService.getActualUserId())
    .subscribe((recieveData: any[]) => {
      this.products = recieveData;
      console.log(this.products);
    });
  }

  deleteItem(index: number) {

     this.cartService.deleteItemFromCart(this.products[index].id)
      .subscribe(() => {
        // this.store.dispatch(new DeleteItem(index))
        this.products.splice(index, 1);
        this.snackBar.open('Successfully removed item from cart!', '', {
          duration: 3000
        });
      },
        error => {
          console.log(error);
        }); 

  }

  incrementQuantity(product: any) {

    if (product.quantity >= 5) return;

    this.newQuantity = product.quantity + 1;
    this.cartService.modifyProduct(product, this.newQuantity).subscribe((modified) => {
      console.log(modified);
      product.quantity = this.newQuantity;
    })
    error => { console.log(error); }

  }

  decrementQuantity(product: any) {

    if (product.quantity <= 1) return;

    this.newQuantity = product.quantity - 1;
    this.cartService.modifyProduct(product, this.newQuantity).subscribe((modified) => {
      console.log(modified);
      product.quantity = this.newQuantity;
    });
    error => { console.log(error); }

  }

  isEmpty(): boolean {

     if (this.products.length == 0) {
      return true;
    }
    else {
      return false;
    } 
  }
  
  Checkout(){
     let dialogRef = this.dialog.open(CartdialogComponent, {
      width: '45%',
      data: this.products
    });
    
    dialogRef.afterClosed().subscribe((changed: Boolean) => {
      if (changed) {
        for(let cartEl of this.products){          
          this.cartService.deleteItemFromCart(cartEl.id).subscribe(()=>{
          }, error =>{console.log(error)});
        }
        this.snackBar.open('Successfully placed order !', '', { duration:3000 });
        this.products = [];
      }
    }); 
  }
}
