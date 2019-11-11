import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrgarifSharedModule } from 'app/shared/shared.module';
import { AuditTrailComponent } from './audit-trail.component';
import { AuditTrailDetailComponent } from './audit-trail-detail.component';
import { AuditTrailUpdateComponent } from './audit-trail-update.component';
import { AuditTrailDeletePopupComponent, AuditTrailDeleteDialogComponent } from './audit-trail-delete-dialog.component';
import { auditTrailRoute, auditTrailPopupRoute } from './audit-trail.route';

const ENTITY_STATES = [...auditTrailRoute, ...auditTrailPopupRoute];

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AuditTrailComponent,
    AuditTrailDetailComponent,
    AuditTrailUpdateComponent,
    AuditTrailDeleteDialogComponent,
    AuditTrailDeletePopupComponent
  ],
  entryComponents: [AuditTrailDeleteDialogComponent]
})
export class OrgarifAuditTrailModule {}
