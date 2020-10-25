import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrgarifSharedModule } from 'app/shared/shared.module';
import { accountState } from './account.route';
import { ActivateComponent } from './activate/activate.component';
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component';
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component';
import { PasswordStrengthBarComponent } from './password/password-strength-bar.component';
import { PasswordComponent } from './password/password.component';
import { RegisterComponent } from './register/register.component';
import { SessionsComponent } from './sessions/sessions.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(accountState)],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SessionsComponent,
    SettingsComponent,
  ],
})
export class AccountModule {}
