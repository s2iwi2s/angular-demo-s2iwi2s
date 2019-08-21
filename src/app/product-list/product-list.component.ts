import { Component } from '@angular/core';

import { productMap } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = [];

  constructor(){}
  ngOnInit() {
    function addToList(item){
      this.products.push(item);
    }
   productMap.forEach(addToList);
    /*productMap.each(function (index, key) {
      window.alert(index + key);
      this.products.push(productMap[key]);      
    });*/
  }

  share() {
    window.alert('The product has been shared!');
  }
  
  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/