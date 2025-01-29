import { ApplicationConfig, inject, LOCALE_ID, provideAppInitializer, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { AuthService } from './services/auth.service'
import { registerLocaleData } from '@angular/common'
import localeFr from '@angular/common/locales/fr'
import { register } from 'swiper/element/bundle'

register()
registerLocaleData(localeFr, 'fr')

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const initFn = ((authService: AuthService) => authService.init())(inject(AuthService))
      return initFn
    }),
    { provide: LOCALE_ID, useValue: 'fr' }
  ]
};
