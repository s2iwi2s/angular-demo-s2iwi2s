import { Component, Input, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

//import { products } from '../products';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';

export interface DialogData {
 title: '',
 message: ''
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

  constructor(
    private route: ActivatedRoute,
    private productService : ProductService,
    private cartService: CartService,
    //private topBarComponent: TopBarComponent, 
    private formBuilder: FormBuilder,
    public dialog: MatDialog
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
      items: this.currentProduct.items
    });
    //this.productForm = this.formBuilder.group(this.currentProduct);
  }
  
  addToCart(product) {
    this.cartService.addToCart(this.currentProduct);
    //window.alert('Your product has been added to the cart!');
  }

  onSubmit(productData){
    for(var key in productData){
      this.currentProduct[key] = productData[key];
    }
    
    this.productService.save(this.currentProduct);

    this.formAction = 'Update';
    //console.warn('The product has been saved', this.currentProduct);
    //window.alert('The product has been saved!');
    
    this.showAlert('Alert', 'The product has been saved');
  }

  showAlert(tle, msg){
    /*const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: {title: tle, message: msg}
    });*/
    this.dialog.open(AlertDialog, {
      data: {title: tle, message: msg}
    });
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
        window.alert('Item removed: ' + itemId);
      } 
    }
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: './alert-dialog.html',
})
export class AlertDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}