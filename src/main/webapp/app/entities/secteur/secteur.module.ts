import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrgarifSharedModule } from 'app/shared/shared.module';
import { SecteurDeleteDialogComponent } from './secteur-delete-dialog.component';
import { SecteurDetailComponent } from './secteur-detail.component';
import { SecteurUpdateComponent } from './secteur-update.component';
import { SecteurComponent } from './secteur.component';
import { secteurRoute } from './secteur.route';

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(secteurRoute)],
  declarations: [SecteurComponent, SecteurDetailComponent, SecteurUpdateComponent, SecteurDeleteDialogComponent],
  entryComponents: [SecteurDeleteDialogComponent],
})
export class OrgarifSecteurModule {}
