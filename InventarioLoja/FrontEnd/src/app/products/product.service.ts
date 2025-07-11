// src/app/products/product.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produto } from '@core/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private nextMockId = 6; // Comece a partir do próximo número após seus IDs mockados (0001, 0002, ..., 0005)

  private mockProducts: Produto[] = [
    { id: '0001', name: 'Teclado Mecânico RGB', description: '...', price: 89.99, category: 'Periféricos', quantityInStock: 25, imageUrl: '...' },
    { id: '0002', name: 'Rato Sem Fios Ergonómico', description: '...', price: 35.50, category: 'Periféricos', quantityInStock: 50, imageUrl: '...' },
    { id: '0003', name: 'Monitor Curvo UltraWide', description: '...', price: 499.00, category: 'Monitores', quantityInStock: 10, imageUrl: '...' },
    { id: '0004', name: 'Webcam Full HD 1080p', description: '...', price: 59.90, category: 'Acessórios', quantityInStock: 30, imageUrl: '...' },
    { id: '0005', name: 'Disco SSD 1TB NVMe', description: '...', price: 120.00, category: 'Armazenamento', quantityInStock: 15, imageUrl: '...' }
  ];

  constructor() { }

  getProducts(): Observable<Produto[]> {
    return of(this.mockProducts);
  }

  getProductById(id: string): Observable<Produto | undefined> {
    const product = this.mockProducts.find(p => p.id === id);
    return of(product);
  }

  createProduct(product: Produto): Observable<Produto> {
    // Geração de novo ID usando o contador
    const newId = (this.nextMockId++).toString().padStart(4, '0');
    const newProduct = { ...product, id: newId };
    this.mockProducts.push(newProduct);
    console.log('Mock: Produto criado', newProduct);
    return of(newProduct);
  }

  updateProduct(product: Produto): Observable<Produto> {
    const index = this.mockProducts.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.mockProducts[index] = product;
      console.log('Mock: Produto atualizado', product);
      return of(product);
    }
    console.warn('Mock: Produto não encontrado para atualização', product.id);
    return of(product);
  }

  deleteProduct(id: string): Observable<void> {
    this.mockProducts = this.mockProducts.filter(p => p.id !== id);
    console.log('Mock: Produto removido', id);
    return of(undefined);
  }
}