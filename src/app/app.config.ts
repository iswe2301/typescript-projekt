import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// Importerar provideHttpClient för att få tillgång från hela applikationen
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()]
};
