// src/app/products/product-list/product-list.component.ts
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../product.service';
import { Produto } from '@core/models/produto.model';
import { CommonModule, CurrencyPipe, NgClass } from '@angular/common'; // Importe CurrencyPipe e NgClass
import { Router, RouterLink } from '@angular/router'; // Importe Router e RouterLink

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe, // Necessário para o pipe 'currency'
    NgClass,      // Necessário para [ngClass]
    //RouterLink    // Necessário se usar routerLink no HTML para navegação (ex: nos botões de editar/detalhes)
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  products: Produto[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Erro ao buscar produtos:', err);
        this.errorMessage = 'Não foi possível carregar os produtos. Por favor, tente novamente.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  viewProductDetails(id: string): void {
      this.router.navigate(['/products/edit', id]);
  }

  // Se você tiver um botão de "Editar" separado
  editProduct(id: string): void {
      this.router.navigate(['/products/edit', id]);
  }

  // Se você tiver um botão de "Eliminar"
  deleteProduct(id: string): void {
    if (confirm('Tem certeza que deseja eliminar este produto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.getProducts(); // Recarregar a lista após a eliminação
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao eliminar produto:', error);
          this.errorMessage = 'Erro ao eliminar produto.';
          this.cdr.detectChanges();
        }
      });
    }
  }


  // Estes métodos estavam aninhados e foram movidos para o local correto
  isLowStock(quantity: number): boolean {
    // 'quantity' refere-se a 'product.quantityInStock' do HTML
    return quantity > 0 && quantity <= 5; // Exemplo: baixo stock se <= 5 unidades
  }

  isOutOfStock(quantity: number): boolean {
    // 'quantity' refere-se a 'product.quantityInStock' do HTML
    return quantity === 0;
  }
}