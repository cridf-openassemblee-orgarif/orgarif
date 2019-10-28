import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrgarifSharedModule } from 'app/shared/shared.module';
import { RepresentantComponent } from './representant.component';
import { RepresentantDetailComponent } from './representant-detail.component';
import { RepresentantUpdateComponent } from './representant-update.component';
import { RepresentantDeletePopupComponent, RepresentantDeleteDialogComponent } from './representant-delete-dialog.component';
import { representantRoute, representantPopupRoute } from './representant.route';

const ENTITY_STATES = [...representantRoute, ...representantPopupRoute];

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RepresentantComponent,
    RepresentantDetailComponent,
    RepresentantUpdateComponent,
    RepresentantDeleteDialogComponent,
    RepresentantDeletePopupComponent
  ],
  entryComponents: [RepresentantDeleteDialogComponent]
})
export class OrgarifRepresentantModule {}
