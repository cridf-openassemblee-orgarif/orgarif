import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeStructure } from 'app/shared/model/type-structure.model';
import { TypeStructureService } from './type-structure.service';

@Component({
  selector: 'jhi-type-structure-delete-dialog',
  templateUrl: './type-structure-delete-dialog.component.html'
})
export class TypeStructureDeleteDialogComponent {
  typeStructure: ITypeStructure;

  constructor(
    protected typeStructureService: TypeStructureService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.typeStructureService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'typeStructureListModification',
        content: 'Deleted an typeStructure'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-type-structure-delete-popup',
  template: ''
})
export class TypeStructureDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeStructure }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TypeStructureDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.typeStructure = typeStructure;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/type-structure', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/type-structure', { outlets: { popup: null } }]);
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
