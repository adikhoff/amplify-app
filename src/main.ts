import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {Amplify, Auth, Storage} from 'aws-amplify';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);
Auth.configure(awsmobile);
Storage.configure(awsmobile);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
