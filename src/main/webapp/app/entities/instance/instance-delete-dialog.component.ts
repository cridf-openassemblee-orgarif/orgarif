import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInstance } from 'app/shared/model/instance.model';
import { InstanceService } from './instance.service';

@Component({
  selector: 'jhi-instance-delete-dialog',
  templateUrl: './instance-delete-dialog.component.html'
})
export class InstanceDeleteDialogComponent {
  instance: IInstance;

  constructor(protected instanceService: InstanceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.instanceService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'instanceListModification',
        content: 'Deleted an instance'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-instance-delete-popup',
  template: ''
})
export class InstanceDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ instance }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(InstanceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.instance = instance;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/instance', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/instance', { outlets: { popup: null } }]);
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
