import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrgarifOrganismeBlockModule } from 'app/components/organisme/organisme-block.module';
import { ListComponent } from 'app/list/list.component';
import { LIST_ROUTE } from 'app/list/list.route';
import { OrgarifSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild([LIST_ROUTE]), OrgarifOrganismeBlockModule],
  declarations: [ListComponent],
})
export class OrgarifListModule {}
