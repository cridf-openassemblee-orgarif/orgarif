import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrgarifRepresentantsBlockModule } from 'app/components/representants/representants-block.module';
import { EDITION_ROUTE } from '../../edition/edition.route';
import { OrgarifSharedModule } from '../../shared/shared.module';
import { OrganismeBlockComponent } from './organisme-block.component';

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild([EDITION_ROUTE]), OrgarifRepresentantsBlockModule],
  declarations: [OrganismeBlockComponent],
  exports: [OrganismeBlockComponent],
})
export class OrgarifOrganismeBlockModule {}
