import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrgarifOrganismeBlockModule } from 'app/components/organisme/organisme-block.module';
import { SaisieComponent } from 'app/saisie/saisie.component';
import { SAISIE_ROUTE } from 'app/saisie/saisie.route';
import { OrgarifSharedModule } from 'app/shared/shared.module';
import { Ng2CompleterModule } from 'ng2-completer';

@NgModule({
  imports: [NgSelectModule, Ng2CompleterModule, OrgarifSharedModule, RouterModule.forChild([SAISIE_ROUTE]), OrgarifOrganismeBlockModule],
  declarations: [SaisieComponent],
})
export class OrgarifSaisieModule {}
