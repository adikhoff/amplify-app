import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Amplify, Auth } from 'aws-amplify';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);
Auth.configure(awsmobile);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
