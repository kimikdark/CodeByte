// src/app/app.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // Adicionado RouterLinkActive

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive // Adicione RouterLinkActive aqui
  ],
  template: `
    <header>
      <h1>{{ title }}</h1>
      <nav>
        <a routerLink="/products" routerLinkActive="active" ariaCurrentWhenActive="page">Produtos</a>
        </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>
      <p>&copy; {{ currentYear }} CodeByte. Todos os direitos reservados.</p>
    </footer>
  `,
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'CodeByte - Sistema de Gestão de Inventário';
  currentYear = new Date().getFullYear();
}