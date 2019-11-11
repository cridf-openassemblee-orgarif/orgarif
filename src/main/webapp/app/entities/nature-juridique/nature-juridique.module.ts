import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrgarifSharedModule } from 'app/shared/shared.module';
import { NatureJuridiqueComponent } from './nature-juridique.component';
import { NatureJuridiqueDetailComponent } from './nature-juridique-detail.component';
import { NatureJuridiqueUpdateComponent } from './nature-juridique-update.component';
import { NatureJuridiqueDeletePopupComponent, NatureJuridiqueDeleteDialogComponent } from './nature-juridique-delete-dialog.component';
import { natureJuridiqueRoute, natureJuridiquePopupRoute } from './nature-juridique.route';

const ENTITY_STATES = [...natureJuridiqueRoute, ...natureJuridiquePopupRoute];

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NatureJuridiqueComponent,
    NatureJuridiqueDetailComponent,
    NatureJuridiqueUpdateComponent,
    NatureJuridiqueDeleteDialogComponent,
    NatureJuridiqueDeletePopupComponent
  ],
  entryComponents: [NatureJuridiqueDeleteDialogComponent]
})
export class OrgarifNatureJuridiqueModule {}
