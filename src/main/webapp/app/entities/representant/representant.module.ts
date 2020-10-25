import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrgarifSharedModule } from 'app/shared/shared.module';
import { RepresentantDeleteDialogComponent } from './representant-delete-dialog.component';
import { RepresentantDetailComponent } from './representant-detail.component';
import { RepresentantUpdateComponent } from './representant-update.component';
import { RepresentantComponent } from './representant.component';
import { representantRoute } from './representant.route';

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(representantRoute)],
  declarations: [RepresentantComponent, RepresentantDetailComponent, RepresentantUpdateComponent, RepresentantDeleteDialogComponent],
  entryComponents: [RepresentantDeleteDialogComponent],
})
export class OrgarifRepresentantModule {}
