import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrgarifSharedModule } from 'app/shared/shared.module';
import { HomeComponent } from './home.component';
import { HOME_ROUTE } from './home.route';

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class OrgarifHomeModule {}
