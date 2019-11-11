import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IElu } from 'app/shared/model/elu.model';
import { EluService } from './elu.service';

@Component({
  selector: 'jhi-elu-delete-dialog',
  templateUrl: './elu-delete-dialog.component.html'
})
export class EluDeleteDialogComponent {
  elu: IElu;

  constructor(protected eluService: EluService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.eluService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'eluListModification',
        content: 'Deleted an elu'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-elu-delete-popup',
  template: ''
})
export class EluDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ elu }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EluDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.elu = elu;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/elu', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/elu', { outlets: { popup: null } }]);
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
