// src/app/core/models/produto.model.ts
export interface Produto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantityInStock: number;
  imageUrl?: string; // Adicione esta linha (o '?' torna-a opcional, caso alguns produtos não tenham imagem)
}