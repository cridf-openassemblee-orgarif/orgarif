import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrgarifSharedModule } from 'app/shared/shared.module';
import { SecteurComponent } from './secteur.component';
import { SecteurDetailComponent } from './secteur-detail.component';
import { SecteurUpdateComponent } from './secteur-update.component';
import { SecteurDeletePopupComponent, SecteurDeleteDialogComponent } from './secteur-delete-dialog.component';
import { secteurRoute, secteurPopupRoute } from './secteur.route';

const ENTITY_STATES = [...secteurRoute, ...secteurPopupRoute];

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SecteurComponent,
    SecteurDetailComponent,
    SecteurUpdateComponent,
    SecteurDeleteDialogComponent,
    SecteurDeletePopupComponent
  ],
  entryComponents: [SecteurDeleteDialogComponent]
})
export class OrgarifSecteurModule {}
