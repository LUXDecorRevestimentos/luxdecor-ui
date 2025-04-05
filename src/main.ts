import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AdminComponent } from './app/admin/admin.component'; // Import the new component

const additionalComponents = [AdminComponent];
const enhancedAppConfig = { ...appConfig, providers: [...appConfig.providers, ...additionalComponents] };

bootstrapApplication(AppComponent, enhancedAppConfig)
  .catch((err) => console.error(err));