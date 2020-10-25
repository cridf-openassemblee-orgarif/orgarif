import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IRepresentant } from 'app/shared/model/representant.model';
import { JhiEventManager } from 'ng-jhipster';
import { RepresentantService } from './representant.service';

@Component({
  templateUrl: './representant-delete-dialog.component.html',
})
export class RepresentantDeleteDialogComponent {
  representant?: IRepresentant;

  constructor(
    protected representantService: RepresentantService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.representantService.delete(id).subscribe(() => {
      this.eventManager.broadcast('representantListModification');
      this.activeModal.close();
    });
  }
}
