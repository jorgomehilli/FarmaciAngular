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
    this.cartService.getProducts()
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
        this.cartService.getCartItemsNumber();
      },
        error => {
          console.log(error);
        }); 

  }

  incrementQuantity(index: number) {
    console.log(this.products[index].stockQuantity);

    if(this.products[index].stockQuantity>0){
      if(this.products[index].quantity >=5){
        this.snackBar.open("Quantity cannot exceed 5",'', {duration:3000});
        return;
      }
    } else
    {return;}
    
    this.cartService.incrementQuantity(this.products[index].id).subscribe(() => {
      this.products[index].quantity  = this.products[index].quantity + 1;
      this.products[index].stockQuantity = this.products[index].stockQuantity-1;
    },
    error =>{ console.log(error);});
    

    // if (product.quantity >= 5) return;

    // this.newQuantity = product.quantity + 1;
    // this.cartService.modifyProduct(product, this.newQuantity).subscribe((modified) => {
    //   console.log(modified);
    //   product.quantity = this.newQuantity;
    // })
    // error => { console.log(error); }

  }

  decrementQuantity(index: number) {

    if(this.products[index].quantity <=1){
      this.snackBar.open("Quantity cannot be lower than 1",'', {duration:3000});
      return;
    }


    this.cartService.decrementQuantity(this.products[index].id).subscribe(()=>{
      this.products[index].quantity  = this.products[index].quantity - 1;
      this.products[index].stockQuantity = this.products[index].stockQuantity + 1;

    },
    error =>{ console.log(error);});

    // if (product.quantity <= 1) return;

    // this.newQuantity = product.quantity - 1;
    // this.cartService.modifyProduct(product, this.newQuantity).subscribe((modified) => {
    //   console.log(modified);
    //   product.quantity = this.newQuantity;
    // });
    // error => { console.log(error); }

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

    dialogRef.afterClosed().subscribe((changed) => {
      if(changed){
        this.cartService.purchaseCartItems(this.products).subscribe(()=>{
          this.snackBar.open('Successfully placed order !', '', { duration:3000 });
          this.products = [];
          this.cartService.getCartItemsNumber();
        }, error =>{ console.log(error);
        });
      }
    });
    
    // dialogRef.afterClosed().subscribe((changed: Boolean) => {
    //   if (changed) {
    //     for(let cartEl of this.products){          
    //       this.cartService.deleteItemFromCart(cartEl.id).subscribe(()=>{
    //       }, error =>{console.log(error)});
    //     }
    //     this.snackBar.open('Successfully placed order !', '', { duration:3000 });
    //     this.products = [];
    //   }
    // }); 
  }

  
}
