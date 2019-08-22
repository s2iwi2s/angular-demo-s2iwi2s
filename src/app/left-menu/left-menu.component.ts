import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  leftMenuList = [{
    name: 'Products',
    url:'/'
  },{
    name: 'Cart',
    url:'/cart'
  },{
    name: 'Shippping',
    url:'/shipping'
  }];

  constructor() { }

  ngOnInit() {
  }

}