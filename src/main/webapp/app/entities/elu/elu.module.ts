import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrgarifSharedModule } from 'app/shared/shared.module';
import { EluComponent } from './elu.component';
import { EluDetailComponent } from './elu-detail.component';
import { EluUpdateComponent } from './elu-update.component';
import { EluDeletePopupComponent, EluDeleteDialogComponent } from './elu-delete-dialog.component';
import { eluRoute, eluPopupRoute } from './elu.route';

const ENTITY_STATES = [...eluRoute, ...eluPopupRoute];

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [EluComponent, EluDetailComponent, EluUpdateComponent, EluDeleteDialogComponent, EluDeletePopupComponent],
  entryComponents: [EluDeleteDialogComponent]
})
export class OrgarifEluModule {}
