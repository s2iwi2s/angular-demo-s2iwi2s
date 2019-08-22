import { Component, OnInit } from '@angular/core';
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
  
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private formBuilder: FormBuilder,) {
      
    }

  ngOnInit() {
    var productsMap = Object.fromEntries(
      products.map(obj => [obj.productId, obj])
    )
    //console.warn('productsMap==>', productsMap);

    this.route.paramMap.subscribe(params => {
        this.product = productsMap[params.get('productId')];
    });
    console.warn('this.product==>', this.product);
    this.productForm = this.formBuilder.group({
      productId: this.product.productId,
      name: this.product.name,
      price: this.product.price,
      description: this.product.description
    });
    console.warn('this.productForm==>', this.productForm);
  }
  
  addToCart(product) {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }
  
  onSubmit(productData){
    for(var key in productData){
      this.product[key] = productData[key];
    }
    
    console.warn('The product has been saved', this.product);
    window.alert('The product has been saved!');
  }
}