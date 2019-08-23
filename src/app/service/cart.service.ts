import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) {}
  
  addToCart(product) {
    this.items.push(product);
    this.change.emit(this.items);
  }

  removeToCart(idx){
    this.items.splice(idx, 1);
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