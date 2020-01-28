import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product.model';
import { ProductsService } from 'src/app/products/products.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProductsdialogComponent } from './productsdialog/productsdialog.component';

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.css']
})
export class ProductmanagementComponent implements OnInit {

  private products: Product[];
  
  constructor(private productService: ProductsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.productService.recieveData().subscribe((products:Product[])=>{
      this.products=products;
    },
    error=> (console.log(error)));
  }

  openDialog(){
   let dialogRef = this.dialog.open(ProductsdialogComponent, {width: '40%'});

   dialogRef.afterClosed().subscribe(changed => {
    if (changed) {
      this.productService.recieveData()
      .subscribe(data => this.products = data);
    }
  });
  }

  updateProduct(product: Product){
    let dialogRef =this.dialog.open(ProductsdialogComponent, {
      width: '40%',
      data: product
    });
    
    dialogRef.afterClosed().subscribe(changed => {
      if (changed) {
        this.productService.recieveData()
        .subscribe(data => this.products = data);
      }
    });
  }

  deleteProduct(index: number){
    this.productService.deleteProduct(this.products[index]).subscribe(()=>{
      this.products.splice(index, 1);
      this.snackBar.open('Product deleted successfully! ', '', {duration: 3000})
    },
    error=>{console.log(error);});
  }
}
