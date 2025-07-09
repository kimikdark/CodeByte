  // src/main.ts
import 'zone.js'; // <-- ESTA LINHA É ABSOLUTAMENTE OBRIGATÓRIA E DEVE ESTAR AQUI

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Onde as rotas e providers estão configurados
import { AppComponent } from './app/app'; // O seu componente raiz standalone

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));