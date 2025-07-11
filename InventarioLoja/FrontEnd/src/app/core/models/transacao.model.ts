export interface Transacao {
  id: string;
  productId: string;
  type: 'entrada' | 'saida'; // Ou 'addition' | 'removal'
  quantity: number;
  date: string; // Mais simples para MVP
}