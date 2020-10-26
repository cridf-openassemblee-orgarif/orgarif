import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrgarifAddRepresentantBlockModule } from 'app/components/add-representant/add-representant-block.module';
import { EDITION_ROUTE } from '../../edition/edition.route';
import { OrgarifSharedModule } from '../../shared/shared.module';
import { RepresentantsBlockComponent } from './representants-block.component';

@NgModule({
  imports: [OrgarifSharedModule, OrgarifAddRepresentantBlockModule, RouterModule.forChild([EDITION_ROUTE])],
  declarations: [RepresentantsBlockComponent],
  exports: [RepresentantsBlockComponent],
})
export class OrgarifRepresentantsBlockModule {}
