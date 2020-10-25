import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrgarifSharedModule } from 'app/shared/shared.module';
import { NatureJuridiqueDeleteDialogComponent } from './nature-juridique-delete-dialog.component';
import { NatureJuridiqueDetailComponent } from './nature-juridique-detail.component';
import { NatureJuridiqueUpdateComponent } from './nature-juridique-update.component';
import { NatureJuridiqueComponent } from './nature-juridique.component';
import { natureJuridiqueRoute } from './nature-juridique.route';

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(natureJuridiqueRoute)],
  declarations: [
    NatureJuridiqueComponent,
    NatureJuridiqueDetailComponent,
    NatureJuridiqueUpdateComponent,
    NatureJuridiqueDeleteDialogComponent,
  ],
  entryComponents: [NatureJuridiqueDeleteDialogComponent],
})
export class OrgarifNatureJuridiqueModule {}
