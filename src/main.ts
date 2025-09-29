import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const enhancedAppConfig = { 
  ...appConfig, 
  providers: [
    ...appConfig.providers, 
    // provideClientHydration(withEventReplay())
  ] 
};

bootstrapApplication(AppComponent, enhancedAppConfig)
  .catch((err) => console.error(err));