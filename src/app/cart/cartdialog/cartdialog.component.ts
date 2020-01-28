import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-cartdialog',
  templateUrl: './cartdialog.component.html',
  styleUrls: ['./cartdialog.component.css']
})
export class CartdialogComponent implements OnInit {
  private total: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public products: any[],
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private matDialogRef: MatDialogRef<CartdialogComponent>,

  ) { }

  ngOnInit() {
    this.getTotal();
  }

onClose(){
    this.matDialogRef.close(false);
}
onPurchase(){
  this.matDialogRef.close(true);
}
getTotal(){
  for(let cartEl of this.products){
    this.total = this.total + cartEl.quantity* cartEl.price;
  }
}

}
