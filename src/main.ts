import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const enhancedAppConfig = { 
  ...appConfig, 
  providers: [
    ...appConfig.providers, 
    provideAnimations()
    // provideClientHydration(withEventReplay())
  ] 
};

bootstrapApplication(AppComponent, enhancedAppConfig)
  .catch((err) => console.error(err));