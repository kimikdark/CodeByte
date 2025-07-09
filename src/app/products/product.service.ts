// src/app/products/product.service.ts
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http'; // Remova ou comente esta linha
import { Observable, of } from 'rxjs';
import { Produto } from '@core/models/produto.model'; // Use o alias aqui!

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private mockProducts: Produto[] = [
    { id: 1, name: 'Produto A', description: 'Descrição do Produto A', price: 10.00 },
    { id: 2, name: 'Produto B', description: 'Descrição do Produto B', price: 25.50 },
    { id: 3, name: 'Produto C', description: 'Descrição do Produto C', price: 5.99 }
  ];

  // constructor(private http: HttpClient) { } // Remova ou comente o construtor do HttpClient

  getProducts(): Observable<Produto[]> {
    return of(this.mockProducts); // Garanta que está a retornar os dados mockados
  }
}