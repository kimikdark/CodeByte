import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Categoria } from '../../core/models/categoria.model'; // Ajuste o caminho conforme a sua estrutura

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private mockCategories: Categoria[] = [
    { id: 'cat-001', name: 'Periféricos', description: 'Eletrónicos para computador' },
    { id: 'cat-002', name: 'Monitores', description: 'Ecrãs para visualização' },
    { id: 'cat-003', name: 'Armazenamento', description: 'Dispositivos de armazenamento de dados' }
  ];

  constructor() { }
  getCategories(): Observable<Categoria[]> { return of(this.mockCategories); }
  // Para MVP, não precisa de create/update/delete aqui, apenas GET
}