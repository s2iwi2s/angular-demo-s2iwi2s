import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;
  totalPrice = 0;
  checkoutForm;

  constructor(private cartService: CartService,
    private formBuilder: FormBuilder,) {
    this.items = this.cartService.getItems();
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
    this.doCompute();
  }

  ngOnInit() {
  }

  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);

    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
    this.doCompute();
  }
  
  doRemoveItem(idx){
    this.cartService.removeToCart(idx);
    this.doCompute();
  }
  doCompute(){
    this.totalPrice = 0;
    this.items.forEach((item) => {
      this.totalPrice += item.product.price;
    })
  }
}