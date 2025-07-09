// src/main.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // <-- CORREÇÃO: Importa 'AppComponent' do ficheiro 'app.ts'
import { config } from './app/app.config.server'; // Importa a configuração do server

const bootstrap = () => bootstrapApplication(AppComponent, config); // <-- Use 'AppComponent' aqui

export default bootstrap;