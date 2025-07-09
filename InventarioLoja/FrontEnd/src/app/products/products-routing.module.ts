// src/app/products/products-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component'; // Caminho está correto

const routes: Routes = [
  {
    path: '', // Rota vazia significa /products
    component: ProductListComponent
  },
  // ... outras rotas específicas de produtos
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { } // EXPORTAR o módulo