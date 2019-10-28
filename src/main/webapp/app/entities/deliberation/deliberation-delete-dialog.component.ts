import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeliberation } from 'app/shared/model/deliberation.model';
import { DeliberationService } from './deliberation.service';

@Component({
  selector: 'jhi-deliberation-delete-dialog',
  templateUrl: './deliberation-delete-dialog.component.html'
})
export class DeliberationDeleteDialogComponent {
  deliberation: IDeliberation;

  constructor(
    protected deliberationService: DeliberationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.deliberationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'deliberationListModification',
        content: 'Deleted an deliberation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-deliberation-delete-popup',
  template: ''
})
export class DeliberationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ deliberation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DeliberationDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.deliberation = deliberation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/deliberation', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/deliberation', { outlets: { popup: null } }]);
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
