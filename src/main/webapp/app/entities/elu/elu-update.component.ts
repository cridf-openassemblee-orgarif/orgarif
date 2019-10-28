import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IElu, Elu } from 'app/shared/model/elu.model';
import { EluService } from './elu.service';

@Component({
  selector: 'jhi-elu-update',
  templateUrl: './elu-update.component.html'
})
export class EluUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    sourceId: [null, [Validators.required]],
    sourceUid: [null, [Validators.required]],
    civilite: [],
    nom: [],
    prenom: [],
    groupePolitique: [],
    groupePolitiqueCourt: [],
    image: [],
    actif: []
  });

  constructor(protected eluService: EluService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ elu }) => {
      this.updateForm(elu);
    });
  }

  updateForm(elu: IElu) {
    this.editForm.patchValue({
      id: elu.id,
      sourceId: elu.sourceId,
      sourceUid: elu.sourceUid,
      civilite: elu.civilite,
      nom: elu.nom,
      prenom: elu.prenom,
      groupePolitique: elu.groupePolitique,
      groupePolitiqueCourt: elu.groupePolitiqueCourt,
      image: elu.image,
      actif: elu.actif
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const elu = this.createFromForm();
    if (elu.id !== undefined) {
      this.subscribeToSaveResponse(this.eluService.update(elu));
    } else {
      this.subscribeToSaveResponse(this.eluService.create(elu));
    }
  }

  private createFromForm(): IElu {
    return {
      ...new Elu(),
      id: this.editForm.get(['id']).value,
      sourceId: this.editForm.get(['sourceId']).value,
      sourceUid: this.editForm.get(['sourceUid']).value,
      civilite: this.editForm.get(['civilite']).value,
      nom: this.editForm.get(['nom']).value,
      prenom: this.editForm.get(['prenom']).value,
      groupePolitique: this.editForm.get(['groupePolitique']).value,
      groupePolitiqueCourt: this.editForm.get(['groupePolitiqueCourt']).value,
      image: this.editForm.get(['image']).value,
      actif: this.editForm.get(['actif']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IElu>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
