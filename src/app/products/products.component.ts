import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: []
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = new Product("", "", "");

  constructor(private productsService: ProductsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.productsService.recieveData().subscribe((productsResponse: Product[]) => {
      this.products = productsResponse;
      console.log(productsResponse);
    }, error => {
      console.log(error);
    })
  };

  getAuthRole(){

  return this.authService.getRole();
  }
}


