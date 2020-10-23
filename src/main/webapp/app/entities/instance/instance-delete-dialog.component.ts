import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInstance } from 'app/shared/model/instance.model';
import { InstanceService } from './instance.service';

@Component({
  templateUrl: './instance-delete-dialog.component.html',
})
export class InstanceDeleteDialogComponent {
  instance?: IInstance;

  constructor(protected instanceService: InstanceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.instanceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('instanceListModification');
      this.activeModal.close();
    });
  }
}
