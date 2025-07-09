// src/app/products/products.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component'; // <-- Importe aqui
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // REMOVA ProductListComponent DAQUI, pois ele é standalone
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ProductListComponent, // <-- IMPORTANTE: Importe o componente standalone aqui
    FormsModule,
    ReactiveFormsModule
  ],
  // providers: [ProductService] // ProductService já é providedIn: 'root', não precisa mais aqui
})
export class ProductsModule { }