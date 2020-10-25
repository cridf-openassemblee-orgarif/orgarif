import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { INatureJuridique } from 'app/shared/model/nature-juridique.model';
import { JhiEventManager } from 'ng-jhipster';
import { NatureJuridiqueService } from './nature-juridique.service';

@Component({
  templateUrl: './nature-juridique-delete-dialog.component.html',
})
export class NatureJuridiqueDeleteDialogComponent {
  natureJuridique?: INatureJuridique;

  constructor(
    protected natureJuridiqueService: NatureJuridiqueService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.natureJuridiqueService.delete(id).subscribe(() => {
      this.eventManager.broadcast('natureJuridiqueListModification');
      this.activeModal.close();
    });
  }
}
