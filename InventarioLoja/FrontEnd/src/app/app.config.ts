// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './routes'; // Ou './app.routes' dependendo do seu ficheiro de rotas
import { provideHttpClient, withFetch } from '@angular/common/http'; // Adicione esta linha

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()) // Adicione esta linha
  ]
};