import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { OrgarifAppModule } from './app.module';
import { ProdConfig } from './blocks/config/prod.config';
import './polyfills';

ProdConfig();

if (module['hot']) {
  module['hot'].accept();
}

platformBrowserDynamic()
  .bootstrapModule(OrgarifAppModule, { preserveWhitespaces: true })
  // eslint-disable-next-line no-console
  .then(() => console.log('Application started'))
  .catch(err => console.error(err));
