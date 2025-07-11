import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service'; // VERIFIQUE CAMINHO
import { Transacao } from '../../core/models/transacao.model'; // VERIFIQUE CAMINHO
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-history.component.html', // APONTA PARA O NOVO NOME
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  transactions: Transacao[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
      console.log('Histórico de Transações carregado (mock):', this.transactions);
    });
  }
}