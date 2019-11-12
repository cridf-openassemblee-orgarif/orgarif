import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAuditTrail } from 'app/shared/model/audit-trail.model';
import { AuditTrailService } from './audit-trail.service';

@Component({
  selector: 'jhi-audit-trail-delete-dialog',
  templateUrl: './audit-trail-delete-dialog.component.html'
})
export class AuditTrailDeleteDialogComponent {
  auditTrail: IAuditTrail;

  constructor(
    protected auditTrailService: AuditTrailService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.auditTrailService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'auditTrailListModification',
        content: 'Deleted an auditTrail'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-audit-trail-delete-popup',
  template: ''
})
export class AuditTrailDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ auditTrail }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AuditTrailDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.auditTrail = auditTrail;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/audit-trail', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/audit-trail', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
