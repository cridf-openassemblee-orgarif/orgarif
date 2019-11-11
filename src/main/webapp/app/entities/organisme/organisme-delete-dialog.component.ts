import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrganisme } from 'app/shared/model/organisme.model';
import { OrganismeService } from './organisme.service';

@Component({
  selector: 'jhi-organisme-delete-dialog',
  templateUrl: './organisme-delete-dialog.component.html'
})
export class OrganismeDeleteDialogComponent {
  organisme: IOrganisme;

  constructor(protected organismeService: OrganismeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.organismeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'organismeListModification',
        content: 'Deleted an organisme'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-organisme-delete-popup',
  template: ''
})
export class OrganismeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ organisme }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrganismeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.organisme = organisme;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/organisme', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/organisme', { outlets: { popup: null } }]);
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
