import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  currCartId = 0;
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) {}
  
  addToCart(product) {
    this.items.push({
      cartId: this.currCartId++,
      product: product
    });
    this.change.emit(this.items);
  }

  removeToCart(idx){
    for(let i = 0; i< this.items.length  ;i ++){
      if(this.items[i].cartId == idx){
        this.items.splice(i, 1);
        break;
      }
    }
    this.change.emit(this.items);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    
    this.change.emit(this.items);
    return this.items;
  }
  
  getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }

  getCartCount(){
      return this.items.length;
  }
}