import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ITypeStructure } from 'app/shared/model/type-structure.model';
import { JhiEventManager } from 'ng-jhipster';
import { TypeStructureService } from './type-structure.service';

@Component({
  templateUrl: './type-structure-delete-dialog.component.html',
})
export class TypeStructureDeleteDialogComponent {
  typeStructure?: ITypeStructure;

  constructor(
    protected typeStructureService: TypeStructureService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.typeStructureService.delete(id).subscribe(() => {
      this.eventManager.broadcast('typeStructureListModification');
      this.activeModal.close();
    });
  }
}
