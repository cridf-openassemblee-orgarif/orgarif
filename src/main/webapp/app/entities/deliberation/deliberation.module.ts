import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrgarifSharedModule } from 'app/shared/shared.module';
import { DeliberationComponent } from './deliberation.component';
import { DeliberationDetailComponent } from './deliberation-detail.component';
import { DeliberationUpdateComponent } from './deliberation-update.component';
import { DeliberationDeleteDialogComponent } from './deliberation-delete-dialog.component';
import { deliberationRoute } from './deliberation.route';

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(deliberationRoute)],
  declarations: [DeliberationComponent, DeliberationDetailComponent, DeliberationUpdateComponent, DeliberationDeleteDialogComponent],
  entryComponents: [DeliberationDeleteDialogComponent],
})
export class OrgarifDeliberationModule {}
