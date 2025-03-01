import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';

//import { DemoMaterialModule } from './material-module';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent, AlertDialog, ItemDialog } from './product-details/product-details.component';
import { CartService } from './service/cart.service';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { ProductService } from './service/product.service';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //DemoMaterialModule,
    MatBadgeModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatSidenavModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    AlertDialog,
    ItemDialog,
    CartComponent,
    ShippingComponent,
    LeftMenuComponent,
    ModalComponent
  ],
  entryComponents: [AlertDialog, ItemDialog],
  bootstrap: [ AppComponent ],
  providers: [CartService, ProductService]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/