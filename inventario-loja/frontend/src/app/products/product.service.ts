// src/app/products/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Remova 'of' se não for usar mock data
import { Produto } from '../core/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // A URL base para suas Azure Functions.
  private apiUrl = 'http://localhost:7071/api/products'; // Use a URL real de sua Azure Function

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  createProduct(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  updateProduct(produto: Produto): Observable<Produto> {
    // Certifique-se de que o ID do produto está na URL para o PUT
    return this.http.put<Produto>(`${this.apiUrl}/${produto.id}`, produto);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  increaseStock(productId: string, quantity: number): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}/${productId}/increase-stock`, { quantity });
  }

  decreaseStock(productId: string, quantity: number): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}/${productId}/decrease-stock`, { quantity });
  }
}