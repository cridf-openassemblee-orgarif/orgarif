import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAuditTrail } from 'app/shared/model/audit-trail.model';
import { JhiEventManager } from 'ng-jhipster';
import { AuditTrailService } from './audit-trail.service';

@Component({
  templateUrl: './audit-trail-delete-dialog.component.html',
})
export class AuditTrailDeleteDialogComponent {
  auditTrail?: IAuditTrail;

  constructor(
    protected auditTrailService: AuditTrailService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.auditTrailService.delete(id).subscribe(() => {
      this.eventManager.broadcast('auditTrailListModification');
      this.activeModal.close();
    });
  }
}
