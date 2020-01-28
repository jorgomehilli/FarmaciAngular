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

    getProducts(userId: number) {
        return this.http.get(`http://localhost:3000/users/${userId}/cart1`);
    }

    addItemToCart(p: Product, userId: number) {
        this.http.post<Product>(`http://localhost:3000/cart1`, {
            name: p.name,
            price: p.price,
            imgPath: p.imgPath,
            p_id: p.id,
            quantity: 1,
            userId: userId,
        })
            .subscribe(postData => {
                this.snackBar.open('You added ' + postData.name + ' to the shopping cart! ', '', {
                    duration: 3000
                });
            });

    }

    deleteItemFromCart(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/cart1/${id}`);
    }

    modifyProduct(product: any, newQuantity: number) {

        if(newQuantity > 5) return;
        return this.http.put(`http://localhost:3000/cart1/${product.id}`, {
            name: product.name,
            price: product.price,
            imgPath: product.imgPath,
            p_id: product.p_id,
            quantity: newQuantity,
            userId: product.userId,
            id: product.id
        });
    }

}
