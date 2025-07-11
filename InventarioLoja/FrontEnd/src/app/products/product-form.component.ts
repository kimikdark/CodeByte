// src/app/products/product-form.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { Produto } from '../core/models/produto.model'; // Seu modelo de produto

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode: boolean = false;
  productId: string | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router // <-- Certifique-se de que está 'public'
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      quantityInStock: ['', [Validators.required, Validators.min(0)]]
    });

    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.isEditMode = true;
        this.loadProductForEdit(this.productId);
      }
    });
  }

  loadProductForEdit(id: string): void {
    this.isLoading = true;
    this.errorMessage = null;

    const mockProduct: Produto = {
      id: id,
      name: 'Produto Simulado ' + id,
      description: 'Descrição simulada do produto ' + id,
      price: 99.99,
      imageUrl: undefined,
      category: 'Categoria Teste',
      quantityInStock: 10
    };
    this.productForm.patchValue(mockProduct);
    this.isLoading = false;

    /*
    // Código real para carregar o produto, descomente quando o serviço estiver pronto
    this.productService.getProductById(+id).subscribe({
      next: (product: Produto) => {
        this.productForm.patchValue(product);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar produto para edição:', err);
        this.errorMessage = 'Não foi possível carregar os dados do produto para edição.';
        this.isLoading = false;
      }
    });
    */
  }

  // VAZIO? OU COM ERRO? Certifique-se de que este método está aqui!
  onSubmit(): void { // <-- ESTE MÉTODO É O QUE ESTÁ A FALTAR OU COM ERRO
    if (this.productForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      const productData: Produto = this.productForm.value;

      console.log('Dados do formulário válidos:', productData);

      if (this.isEditMode && this.productId) {
        console.log('Simulando atualização do produto:', this.productId, productData);
        // Chamar productService.updateProduct(this.productId, productData).subscribe(...) aqui
      } else {
        console.log('Simulando criação de novo produto:', productData);
        // Chamar productService.createProduct(productData).subscribe(...) aqui
      }

      // Simular um atraso e depois redirecionar para fins de teste
      setTimeout(() => {
        this.isLoading = false;
        //this.router.navigate(['/products']); // Redirecionar para a lista de produtos após simulação
        alert('Formulário enviado/simulado com sucesso! Verifique o console.');
      }, 1000);

    } else {
      this.productForm.markAllAsTouched();
      console.warn('Formulário inválido. Verifique os campos.');
    }
  }

  get f() { return this.productForm.controls; }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.productForm.get(controlName);
    return !!(control && control.touched && control.errors && control.errors[errorType]);
  }
}