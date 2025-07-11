import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../products/product.service'; // VERIFIQUE CAMINHO
import { Produto } from '../../core/models/produto.model'; // VERIFIQUE CAMINHO
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-dashboard.component.html', // APONTA PARA O NOVO NOME
  styleUrls: ['./stock-dashboard.component.scss']
})
export class StockDashboardComponent implements OnInit {
  products: Produto[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log('Dados de Stock carregados (mock):', this.products);
    });
  }
}