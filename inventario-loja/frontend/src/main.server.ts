// src/main.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // Importa o AppComponent do seu app.ts
import { config } from './app/app.config.server'; // Importa a configuração do server

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;