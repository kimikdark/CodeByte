import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transacao } from '../../core/models/transacao.model'; // Ajuste o caminho conforme a sua estrutura

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private mockTransactions: Transacao[] = [
    { id: 'trans-001', productId: '0001', type: 'entrada', quantity: 10, date: '2025-07-01' },
    { id: 'trans-002', productId: 'prod-002', type: 'saida', quantity: 2, date: '2025-07-02' },
    { id: 'trans-003', productId: '0003', type: 'entrada', quantity: 5, date: '2025-07-05' }
  ];

  constructor() { }
  getTransactions(): Observable<Transacao[]> { return of(this.mockTransactions); }
}