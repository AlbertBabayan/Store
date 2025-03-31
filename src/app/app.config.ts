import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter} from '@angular/router';

import {appRoutes} from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {provideToastr} from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr({
    timeOut: 10000,
    positionClass: 'toast-bottom-left',
    preventDuplicates: true,
  }),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(appRoutes), provideAnimationsAsync(), provideAnimationsAsync(), provideHttpClient()]
};
