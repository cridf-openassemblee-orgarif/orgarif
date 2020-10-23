import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISecteur, Secteur } from 'app/shared/model/secteur.model';
import { SecteurService } from './secteur.service';

@Component({
  selector: 'jhi-secteur-update',
  templateUrl: './secteur-update.component.html',
})
export class SecteurUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    label: [null, [Validators.required]],
  });

  constructor(protected secteurService: SecteurService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ secteur }) => {
      this.updateForm(secteur);
    });
  }

  updateForm(secteur: ISecteur): void {
    this.editForm.patchValue({
      id: secteur.id,
      label: secteur.label,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const secteur = this.createFromForm();
    if (secteur.id !== undefined) {
      this.subscribeToSaveResponse(this.secteurService.update(secteur));
    } else {
      this.subscribeToSaveResponse(this.secteurService.create(secteur));
    }
  }

  private createFromForm(): ISecteur {
    return {
      ...new Secteur(),
      id: this.editForm.get(['id'])!.value,
      label: this.editForm.get(['label'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISecteur>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
