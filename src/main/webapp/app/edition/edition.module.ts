import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrgarifOrganismeBlockModule } from 'app/components/organisme/organisme-block.module';
import { OrgarifRepresentantsBlockModule } from 'app/components/representants/representants-block.module';
import { EditionComponent } from 'app/edition/edition.component';
import { EDITION_ROUTE } from 'app/edition/edition.route';
import { OrgarifSharedModule } from 'app/shared/shared.module';
import { Ng2CompleterModule } from 'ng2-completer';

@NgModule({
  imports: [
    NgSelectModule,
    Ng2CompleterModule,
    OrgarifSharedModule,
    RouterModule.forChild([EDITION_ROUTE]),
    OrgarifOrganismeBlockModule,
    OrgarifRepresentantsBlockModule,
  ],
  declarations: [EditionComponent],
})
export class OrgarifEditionModule {}
