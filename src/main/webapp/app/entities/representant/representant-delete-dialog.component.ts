import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepresentant } from 'app/shared/model/representant.model';
import { RepresentantService } from './representant.service';

@Component({
  selector: 'jhi-representant-delete-dialog',
  templateUrl: './representant-delete-dialog.component.html'
})
export class RepresentantDeleteDialogComponent {
  representant: IRepresentant;

  constructor(
    protected representantService: RepresentantService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.representantService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'representantListModification',
        content: 'Deleted an representant'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-representant-delete-popup',
  template: ''
})
export class RepresentantDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ representant }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RepresentantDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.representant = representant;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/representant', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/representant', { outlets: { popup: null } }]);
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
