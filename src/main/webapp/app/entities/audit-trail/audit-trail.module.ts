import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrgarifSharedModule } from 'app/shared/shared.module';
import { AuditTrailComponent } from './audit-trail.component';
import { AuditTrailDetailComponent } from './audit-trail-detail.component';
import { AuditTrailUpdateComponent } from './audit-trail-update.component';
import { AuditTrailDeleteDialogComponent } from './audit-trail-delete-dialog.component';
import { auditTrailRoute } from './audit-trail.route';

@NgModule({
  imports: [OrgarifSharedModule, RouterModule.forChild(auditTrailRoute)],
  declarations: [AuditTrailComponent, AuditTrailDetailComponent, AuditTrailUpdateComponent, AuditTrailDeleteDialogComponent],
  entryComponents: [AuditTrailDeleteDialogComponent],
})
export class OrgarifAuditTrailModule {}
