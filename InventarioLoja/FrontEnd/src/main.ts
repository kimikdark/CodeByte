// src/main.ts
import 'zone.js'; // Esta linha é obrigatória e deve estar no topo

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Onde as rotas e providers estão configurados
import { AppComponent } from './app/app'; // <-- CORREÇÃO: Importa 'AppComponent' do ficheiro 'app.ts'

bootstrapApplication(AppComponent, appConfig) // <-- Use 'AppComponent' aqui
  .catch((err) => console.error(err));