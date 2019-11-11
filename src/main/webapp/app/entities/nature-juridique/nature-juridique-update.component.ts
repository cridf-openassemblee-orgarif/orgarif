import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INatureJuridique, NatureJuridique } from 'app/shared/model/nature-juridique.model';
import { NatureJuridiqueService } from './nature-juridique.service';

@Component({
  selector: 'jhi-nature-juridique-update',
  templateUrl: './nature-juridique-update.component.html'
})
export class NatureJuridiqueUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    label: [null, [Validators.required]]
  });

  constructor(
    protected natureJuridiqueService: NatureJuridiqueService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ natureJuridique }) => {
      this.updateForm(natureJuridique);
    });
  }

  updateForm(natureJuridique: INatureJuridique) {
    this.editForm.patchValue({
      id: natureJuridique.id,
      label: natureJuridique.label
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const natureJuridique = this.createFromForm();
    if (natureJuridique.id !== undefined) {
      this.subscribeToSaveResponse(this.natureJuridiqueService.update(natureJuridique));
    } else {
      this.subscribeToSaveResponse(this.natureJuridiqueService.create(natureJuridique));
    }
  }

  private createFromForm(): INatureJuridique {
    return {
      ...new NatureJuridique(),
      id: this.editForm.get(['id']).value,
      label: this.editForm.get(['label']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INatureJuridique>>) {
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
