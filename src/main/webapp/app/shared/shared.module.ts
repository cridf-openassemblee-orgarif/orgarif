import { NgModule } from '@angular/core';
import { AlertErrorComponent } from './alert/alert-error.component';
import { AlertComponent } from './alert/alert.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { LoginModalComponent } from './login/login.component';
import { OrgarifSharedLibsModule } from './shared-libs.module';

@NgModule({
  imports: [OrgarifSharedLibsModule],
  declarations: [AlertComponent, AlertErrorComponent, LoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [LoginModalComponent],
  exports: [OrgarifSharedLibsModule, AlertComponent, AlertErrorComponent, LoginModalComponent, HasAnyAuthorityDirective],
})
export class OrgarifSharedModule {}
