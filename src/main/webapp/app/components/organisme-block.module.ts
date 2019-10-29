import { NgModule } from '@angular/core';
import { OrganismeBlockComponent } from 'app/components/organisme-block.component';
import { OrgarifSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [OrgarifSharedModule],
  declarations: [OrganismeBlockComponent],
  exports: [OrganismeBlockComponent],
})
export class OrgarifOrganismeBlockModule {}
