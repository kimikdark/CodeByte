// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterModule
  ],
  templateUrl: './app.component.html', // <--- DEVE APONTAR PARA AQUI
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CodeByte - Sistema de Gestão de Inventário';
  currentYear = new Date().getFullYear();
}