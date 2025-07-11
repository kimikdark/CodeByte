// src/app/app/category-management/category-management.component.ts
import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../services/category.service';
import { Categoria } from '../../core/models/categoria.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-management', // TEM QUE EXISTIR
  standalone: true, // TEM QUE SER 'true'
  imports: [CommonModule], // TEM QUE TER PELO MENOS 'CommonModule'
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit { // EXPORT CLASS TEM QUE EXISTIR
  categories: Categoria[] = [];
  constructor(private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log('Categorias carregadas (mock):', this.categories);
    });
  }
}