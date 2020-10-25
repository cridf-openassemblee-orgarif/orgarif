import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IElu } from 'app/shared/model/elu.model';
import { JhiEventManager } from 'ng-jhipster';
import { EluService } from './elu.service';

@Component({
  templateUrl: './elu-delete-dialog.component.html',
})
export class EluDeleteDialogComponent {
  elu?: IElu;

  constructor(protected eluService: EluService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.eluService.delete(id).subscribe(() => {
      this.eventManager.broadcast('eluListModification');
      this.activeModal.close();
    });
  }
}
