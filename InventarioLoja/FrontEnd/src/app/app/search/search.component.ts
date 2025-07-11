import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../products/product.service'; // VERIFIQUE CAMINHO
import { Produto } from '../../core/models/produto.model'; // VERIFIQUE CAMINHO
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para [(ngModel)]

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html', // APONTA PARA O NOVO NOME
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  allProducts: Produto[] = [];
  filteredProducts: Produto[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.allProducts = data;
      this.filteredProducts = data;
      console.log('Produtos para pesquisa carregados (mock):', this.allProducts);
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = this.allProducts;
      return;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredProducts = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      (product.description && product.description.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (product.category && product.category.toLowerCase().includes(lowerCaseSearchTerm))
    );
    console.log('Resultados da pesquisa (mock):', this.filteredProducts);
  }
}