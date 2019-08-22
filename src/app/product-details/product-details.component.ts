import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { products } from '../products';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product;
  productForm;
  formAction;
  lastProductId = 0;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    //private topBarComponent: TopBarComponent, 
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    var lpid = 0;
    var productsMap = {};
    function createProductsMap(obj, idx){
      productsMap[obj.productId] = obj;
      lpid = obj.productId;
    }

    products.forEach(function(obj, idx){
      productsMap[obj.productId] = obj;
      lpid = obj.productId;
    });
    this.lastProductId = lpid;

    this.route.paramMap.subscribe(params => {
        this.product = productsMap[params.get('productId')];
    });
    
    if(this.product){
      this.formAction = 'Update';
      this.setProductForm();
    }else{
      this.createNewProduct();
    }
  }

  setProductForm(){
    this.productForm = this.formBuilder.group({
      productId: this.product.productId,
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      formAction: this.product.formAction
    });
  }
  
  addToCart(product) {
    this.cartService.addToCart(product);
    //window.alert('Your product has been added to the cart!');
  }

  onSubmit(productData){
    for(var key in productData){
      this.product[key] = productData[key];
    }
    if(this.formAction == 'New'){
      products.push(this.product);
    }
    this.formAction = 'Update';
    console.warn('The product has been saved', this.product);
    window.alert('The product has been saved!');
  }
  onNewProduct(){
    this.createNewProduct();
  }
  
  createNewProduct(){
    this.formAction = 'New';
    this.lastProductId++;
    
    this.product = {
      productId: this.lastProductId,
      name: '',
      price: '',
      description: ''
    };
    this.setProductForm();
  }
}