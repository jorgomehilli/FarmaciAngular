import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProductsService } from 'src/app/products/products.service';


@Component({
  selector: 'app-productsdialog',
  templateUrl: './productsdialog.component.html',
  styleUrls: ['./productsdialog.component.css']
})
export class ProductsdialogComponent implements OnInit {

  productEditForm: FormGroup;
  isUpdate: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public p: any,
    private productsService: ProductsService,
    private matDialogRef: MatDialogRef<ProductsdialogComponent>,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    if (this.p) {
      this.isUpdate = true;
      this.productEditForm = new FormGroup({
        'name': new FormControl(this.p.name, Validators.required),
        'price': new FormControl(this.p.price, Validators.required),
        'imgPath': new FormControl(this.p.imgPath, Validators.required),
        'id': new FormControl(this.p.id, Validators.required)

      });

    }
    else {

      this.productEditForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'price': new FormControl(null, Validators.required),
        'imgPath': new FormControl(null, Validators.required)

      });
    }
  }

  onSubmit() {

    if(!this.productEditForm.valid) return;

    if (!this.isUpdate) {
      this.productsService.addNewProduct(this.productEditForm.value).subscribe(() => {
        this.matDialogRef.close(true);
        this.snackBar.open('Product added successfully!','',{duration:3000});
      },
        error => { console.log(error); });
    } else {
      this.productsService.updateProduct(this.productEditForm.value).subscribe(() => {
        this.matDialogRef.close(true);
        this.snackBar.open('Product updated successfully!','',{duration:3000});

      },
        error => { console.log(error); });
    }
  }

  onClose() {
    this.matDialogRef.close(false);
  }
}
