export const products = [
  {
    productId: '1', 
    name: 'Phone XL',
    price: 799,
    description: 'A large phone with one of the best screens',
    status: '3'
  },
  {
    productId: '2',
    name: 'Phone Mini',
    price: 699,
    description: 'A great phone with one of the best cameras',
    items: [
        {id:'1', name:'Keypad', serial:'AC1-TS123-D45'},
        {id:'2', name:'Display', serial:'AC1-TS123-D41'},
        {id:'3', name:'Audio', serial:'AC1-TS123-D44'}]
  },
  {
    productId: '3',
    name: 'Phone Standard',
    price: 299,
    description: '',
    status: '1'
    
  }
];


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/