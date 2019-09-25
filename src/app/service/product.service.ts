import { Injectable } from '@angular/core';
import { products } from '../products';

@Injectable()
export class ProductService {
  productsMap = {};

  lastProductId;
  newItemId = 0;

  constructor() {
    var lpid;
    console.info('ProductService products =>', products);

    var pmap = this.productsMap;
    products.forEach(function(obj, idx){
      pmap[obj.productId] = obj;
      lpid = obj.productId;
    });
    
    this.lastProductId = lpid;

    console.info('ProductService.constructor lastProductId =>', this.lastProductId);
    console.info('ProductService.constructor productsMap =>', this.productsMap);
  }

  incrementLastProductId(){
    return '' + (++this.lastProductId); 
  }

  getProduct(id){
    console.info('ProductService.getProduct id =>', id);
    return this.productsMap[id];
  }

  getProductList(){
    console.info('ProductService.getProductList =>', products);
    return products;
  }
  incrementNewItemId(){
    return --this.newItemId;
  }

  save(item){
    var p = this.productsMap[item.productId];
    if(!p){
      products.push(item);
      this.productsMap[item.productId] = item;
    }
  }
}