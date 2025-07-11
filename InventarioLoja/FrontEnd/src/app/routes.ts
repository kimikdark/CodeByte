// src/app/routes.ts

import { Routes } from '@angular/router';

// Componentes na pasta 'products' (diretamente em src/app)
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form.component';

// Componentes dentro da sua pasta 'app' aninhada (src/app/app/)
import { CategoryManagementComponent } from './app/category-management/category-management.component';
import { StockDashboardComponent } from './app/stock-dashboard/stock-dashboard.component';
import { TransactionHistoryComponent } from './app/transaction-history/transaction-history.component';
import { SearchComponent } from './app/search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: 'categories', component: CategoryManagementComponent },
  { path: 'stock', component: StockDashboardComponent },
  { path: 'transactions', component: TransactionHistoryComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '/products' }
];