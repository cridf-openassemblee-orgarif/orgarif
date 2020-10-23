import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrgarifSharedModule } from 'app/shared/shared.module';
import { OrganismeComponent } from './organisme.component';
import { OrganismeDetailComponent } from './organisme-detail.component';
import { OrganismeUpdateComponent } from './organisme-update.component';
import { OrganismeDeleteDialogComponent } from './organisme-delete-dialog.component';
import { organismeRoute } from './organisme.route';

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(organismeRoute)],
  declarations: [OrganismeComponent, OrganismeDetailComponent, OrganismeUpdateComponent, OrganismeDeleteDialogComponent],
  entryComponents: [OrganismeDeleteDialogComponent],
})
export class OrgarifOrganismeModule {}
