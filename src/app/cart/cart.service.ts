import { Product } from '../products/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';



@Injectable()
export class CartService {

    constructor(private http: HttpClient,
        private snackBar: MatSnackBar,
    ) { };

    getProducts() {
        return this.http.get(`http://localhost:8787/users/cart`);
    }

    addItemToCart(id:number) {
        this.http.post(`http://localhost:8787/cart/add`, id)
            .subscribe((postData: any) => {
                console.log(postData);
                this.snackBar.open('You added ' + postData.product.name + ' to the shopping cart! ', '', {
                    duration: 3000
                });
            });

    }

    deleteItemFromCart(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:8787/cart/delete/${id}`);
    }

    purchaseCartItems(cart_items: any[]): Observable<void>{
        console.log(cart_items)
      return  this.http.delete<void>('http://localhost:8787/cart/purchase/');
    }

    incrementQuantity(id:number) {


        return this.http.get(`http://localhost:8787/cart/increment/${id}`);

        // if(newQuantity > 5) return;
        // return this.http.put(`http://localhost:3000/cart1/${product.id}`, {
        //     name: product.name,
        //     price: product.price,
        //     imgPath: product.imgPath,
        //     p_id: product.p_id,
        //     quantity: newQuantity,
        //     userId: product.userId,
        //     id: product.id
        // });
    }

    decrementQuantity(id:number){

        return this.http.get(`http://localhost:8787/cart/decrement/${id}`);
    }

}
