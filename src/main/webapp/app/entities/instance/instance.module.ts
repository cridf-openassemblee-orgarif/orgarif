import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrgarifSharedModule } from 'app/shared/shared.module';
import { InstanceComponent } from './instance.component';
import { InstanceDetailComponent } from './instance-detail.component';
import { InstanceUpdateComponent } from './instance-update.component';
import { InstanceDeletePopupComponent, InstanceDeleteDialogComponent } from './instance-delete-dialog.component';
import { instanceRoute, instancePopupRoute } from './instance.route';

const ENTITY_STATES = [...instanceRoute, ...instancePopupRoute];

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    InstanceComponent,
    InstanceDetailComponent,
    InstanceUpdateComponent,
    InstanceDeleteDialogComponent,
    InstanceDeletePopupComponent
  ],
  entryComponents: [InstanceDeleteDialogComponent]
})
export class OrgarifInstanceModule {}
