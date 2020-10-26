import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { EDITION_ROUTE } from '../../edition/edition.route';
import { OrgarifSharedModule } from '../../shared/shared.module';
import { AddRepresentantBlockComponent } from './add-representant-block.component';

@NgModule({
  imports: [NgSelectModule, OrgarifSharedModule, RouterModule.forChild([EDITION_ROUTE])],
  declarations: [AddRepresentantBlockComponent],
  exports: [AddRepresentantBlockComponent],
})
export class OrgarifAddRepresentantBlockModule {}
