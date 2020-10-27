import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2CompleterModule } from 'ng2-completer';
import { EDITION_ROUTE } from '../../edition/edition.route';
import { OrgarifSharedModule } from '../../shared/shared.module';
import { AddDeliberationBlockComponent } from './add-deliberation-block.component';

@NgModule({
  imports: [OrgarifSharedModule, Ng2CompleterModule, RouterModule.forChild([EDITION_ROUTE])],
  declarations: [AddDeliberationBlockComponent],
  exports: [AddDeliberationBlockComponent],
})
export class OrgarifAddDeliberationBlockModule {}
