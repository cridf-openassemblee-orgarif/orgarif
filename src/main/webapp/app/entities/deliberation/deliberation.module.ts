import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrgarifSharedModule } from 'app/shared/shared.module';
import { DeliberationComponent } from './deliberation.component';
import { DeliberationDetailComponent } from './deliberation-detail.component';
import { DeliberationUpdateComponent } from './deliberation-update.component';
import { DeliberationDeletePopupComponent, DeliberationDeleteDialogComponent } from './deliberation-delete-dialog.component';
import { deliberationRoute, deliberationPopupRoute } from './deliberation.route';

const ENTITY_STATES = [...deliberationRoute, ...deliberationPopupRoute];

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DeliberationComponent,
    DeliberationDetailComponent,
    DeliberationUpdateComponent,
    DeliberationDeleteDialogComponent,
    DeliberationDeletePopupComponent
  ],
  entryComponents: [DeliberationDeleteDialogComponent]
})
export class OrgarifDeliberationModule {}
