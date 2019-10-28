import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISecteur } from 'app/shared/model/secteur.model';
import { SecteurService } from './secteur.service';

@Component({
  selector: 'jhi-secteur-delete-dialog',
  templateUrl: './secteur-delete-dialog.component.html'
})
export class SecteurDeleteDialogComponent {
  secteur: ISecteur;

  constructor(protected secteurService: SecteurService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.secteurService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'secteurListModification',
        content: 'Deleted an secteur'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-secteur-delete-popup',
  template: ''
})
export class SecteurDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ secteur }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SecteurDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.secteur = secteur;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/secteur', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/secteur', { outlets: { popup: null } }]);
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
