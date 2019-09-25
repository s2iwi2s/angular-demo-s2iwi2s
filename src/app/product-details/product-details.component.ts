import { Component, Input, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

//import { products } from '../products';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
//import * as $ from 'jquery';

export interface AlertDialogData {
  title: '',
  message: ''
}

export interface ItemDialogData {
  id: '',
  name: '',
  serial: ''
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  currentProduct;
  productForm;
  formAction;
  currentItemId = 0;
  statusList = [
        { name: 'Open', value: '1' },
        { name: 'In Progress', value: '2' },
        { name: 'Complete', value: '3' },
        { name: 'Deleted', value: '4' },
    ];

  constructor(
    private route: ActivatedRoute,
    private productService : ProductService,
    private cartService: CartService,
    //private topBarComponent: TopBarComponent, 
    private formBuilder: FormBuilder,
    public alertDialog: MatDialog,
    public itemDialog: MatDialog
    ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        //this.product = productsMap[params.get('productId')];
        var productId = params.get('productId');
        this.currentProduct = this.productService.getProduct(productId);
    });
    
    console.info('ProductDetailsComponent.ngOnInit this.currentProduct =>', this.currentProduct);
    if(this.currentProduct){
      this.formAction = 'Update';
      this.setProductForm();
    }else{
      this.onNewProduct();
    }
    console.log('ProductDetailsComponent.ngOnInit this.currentProduct', this.currentProduct);
  }

  setProductForm(){
    this.productForm = this.formBuilder.group({
      productId: this.currentProduct.productId,
      name: this.currentProduct.name,
      price: this.currentProduct.price,
      description: this.currentProduct.description,
      status: this.currentProduct.status
    });
    //this.productForm = this.formBuilder.group(this.currentProduct);
  }
  
  addToCart() {
    this.cartService.addToCart(this.currentProduct);
    //window.alert('Your product has been added to the cart!');
  }

  onSubmit(productData){
    console.warn('ProductDetailsComponent.onSubmit productData => ', productData);
    for(var key in productData){
      this.currentProduct[key] = productData[key];
    }
    console.warn('ProductDetailsComponent.onSubmit this.currentProduct => ', this.currentProduct);
    
    this.productService.save(this.currentProduct);

    this.formAction = 'Update';
    //console.warn('The product has been saved', this.currentProduct);
    //window.alert('The product has been saved!');
    
    this.showAlert('Alert', 'The product has been saved');
  }
  

  onNewProduct(){
    this.formAction = 'New';
    this.currentProduct = this.createNewProduct();
    this.setProductForm();
  }

  createNewProduct(){
    return {
      productId: this.productService.incrementLastProductId(),
      name: '',
      price: '',
      description: '',
      items: []
    };
  }
  
  doRemoveProductItem(itemId){
    var pitems = this.currentProduct.items;
    if(pitems){
      var delIdx = -1;
      pitems.forEach(function(item, idx){
        if(item.id == itemId){
          delIdx = idx;
        }
      });
      
      if(delIdx != -1){
        pitems.splice(delIdx, 1);
        //window.alert('Item removed: ' + itemId);
      } 
    }
  }
  doAddItem(){
    if(!this.currentProduct.items){
      this.currentProduct.items = [];
    }
    this.currentItemId--;
    
    //$('#alertModalDialog').modal('show');
    //this.showAlert('Alert!','showAlert');
    this.showItemDialog(this.currentItemId,'test', 'ASD-123-YUI'); 
  }
  
  showItemDialog(itemId, itemName, itemSerial){
    const dialogRef = this.itemDialog.open(ItemDialog, {
      data: {id: itemId,
        name: itemName,
        serial: itemSerial}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result); 
      this.currentProduct.items.push({
        id:result.id, 
        name: result.name, 
        serial: result.serial});
    });
  }

  showAlert(tle, msg){
    this.alertDialog.open(AlertDialog, {
      data: {title: tle, message: msg}
    });
  }
}

@Component({
  selector: 'alert-dialog',
  templateUrl: '../common/alert-dialog.html',
}) export class AlertDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertDialogData) {}
}

@Component({
  selector: 'item-dialog',
  templateUrl: './item-dialog.html',
}) export class ItemDialog {
  itemForm;

  constructor(public dialogRef: MatDialogRef<ItemDialog>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: ItemDialogData) {
    this.itemForm = this.formBuilder.group({
      id: this.data.id,
      name: this.data.name,
      serial: this.data.serial
    });
  }

  closeDialog() {
    this.data.id = this.itemForm.id;
    this.data.name = this.itemForm.name;
    this.data.serial = this.itemForm.serial;

    this.dialogRef.close(this.itemForm.value);
  }
}