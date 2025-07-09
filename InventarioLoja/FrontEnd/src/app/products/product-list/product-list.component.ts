// src/app/products/product-list/product-list.component.ts (exemplo)
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../product.service';
import { Produto } from '../../core/models/produto.model';
import { CommonModule } from '@angular/common'; // Se for standalone

@Component({
  selector: 'app-product-list',
  standalone: true, // Ou false se for modular
  imports: [CommonModule], // Se for standalone, adicione CommonModule
  template: `
    <h2>Lista de Produtos</h2>
    <div *ngIf="products; else loading">
      <ul>
        <li *ngFor="let product of products">
          {{ product.name }} - {{ product.price | currency:'EUR':'symbol':'1.2-2' }}
        </li>
      </ul>
    </div>
    <ng-template #loading>
      <p>A carregar produtos...</p>
    </ng-template>
  `,
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // Geralmente usado com zoneless
})
export class ProductListComponent implements OnInit {
  products: Produto[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef // <-- INJETE ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.cdr.detectChanges(); // <-- CHAME detectChanges() APÓS A ATUALIZAÇÃO DOS DADOS
    });
  }
}