import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrgarifSharedModule } from 'app/shared/shared.module';
import { EluDeleteDialogComponent } from './elu-delete-dialog.component';
import { EluDetailComponent } from './elu-detail.component';
import { EluUpdateComponent } from './elu-update.component';
import { EluComponent } from './elu.component';
import { eluRoute } from './elu.route';

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(eluRoute)],
  declarations: [EluComponent, EluDetailComponent, EluUpdateComponent, EluDeleteDialogComponent],
  entryComponents: [EluDeleteDialogComponent],
})
export class OrgarifEluModule {}
