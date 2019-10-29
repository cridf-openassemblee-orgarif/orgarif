import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrgarifOrganismeBlockModule } from 'app/components/organisme-block.module';
import { Ng2CompleterModule } from 'ng2-completer';
import { OrgarifSharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { SAISIE_ROUTE } from 'app/saisie/saisie.route';
import { SaisieComponent } from 'app/saisie/saisie.component';

@NgModule({
  imports: [NgSelectModule, Ng2CompleterModule, OrgarifSharedModule, RouterModule.forChild([SAISIE_ROUTE]), OrgarifOrganismeBlockModule],
  declarations: [SaisieComponent]
})
export class OrgarifSaisieModule {}
