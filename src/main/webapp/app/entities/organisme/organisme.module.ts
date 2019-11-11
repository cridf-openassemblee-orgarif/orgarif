import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrgarifSharedModule } from 'app/shared/shared.module';
import { OrganismeComponent } from './organisme.component';
import { OrganismeDetailComponent } from './organisme-detail.component';
import { OrganismeUpdateComponent } from './organisme-update.component';
import { OrganismeDeletePopupComponent, OrganismeDeleteDialogComponent } from './organisme-delete-dialog.component';
import { organismeRoute, organismePopupRoute } from './organisme.route';

const ENTITY_STATES = [...organismeRoute, ...organismePopupRoute];

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrganismeComponent,
    OrganismeDetailComponent,
    OrganismeUpdateComponent,
    OrganismeDeleteDialogComponent,
    OrganismeDeletePopupComponent
  ],
  entryComponents: [OrganismeDeleteDialogComponent]
})
export class OrgarifOrganismeModule {}
