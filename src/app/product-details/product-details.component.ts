import { Component, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
        
      this.product = this.getProduct(params.get('productId'));
      //this.product = products.map[params.get('productId')];
    });
  }
  getProduct(productId) {
    var productsMap = Object.fromEntries(
      products.map(obj => [obj.productId, obj])
    )

    var p =  productsMap[productId];
    //window.alert('product found ' + p)
    return p;
  }
  
  addToCart(product) {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }
}