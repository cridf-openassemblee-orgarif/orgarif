import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INatureJuridique } from 'app/shared/model/nature-juridique.model';
import { NatureJuridiqueService } from './nature-juridique.service';

@Component({
  selector: 'jhi-nature-juridique-delete-dialog',
  templateUrl: './nature-juridique-delete-dialog.component.html'
})
export class NatureJuridiqueDeleteDialogComponent {
  natureJuridique: INatureJuridique;

  constructor(
    protected natureJuridiqueService: NatureJuridiqueService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.natureJuridiqueService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'natureJuridiqueListModification',
        content: 'Deleted an natureJuridique'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-nature-juridique-delete-popup',
  template: ''
})
export class NatureJuridiqueDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ natureJuridique }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NatureJuridiqueDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.natureJuridique = natureJuridique;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/nature-juridique', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/nature-juridique', { outlets: { popup: null } }]);
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
