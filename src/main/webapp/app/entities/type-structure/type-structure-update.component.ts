import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITypeStructure, TypeStructure } from 'app/shared/model/type-structure.model';
import { TypeStructureService } from './type-structure.service';

@Component({
  selector: 'jhi-type-structure-update',
  templateUrl: './type-structure-update.component.html'
})
export class TypeStructureUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    label: [null, [Validators.required]]
  });

  constructor(protected typeStructureService: TypeStructureService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ typeStructure }) => {
      this.updateForm(typeStructure);
    });
  }

  updateForm(typeStructure: ITypeStructure) {
    this.editForm.patchValue({
      id: typeStructure.id,
      label: typeStructure.label
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const typeStructure = this.createFromForm();
    if (typeStructure.id !== undefined) {
      this.subscribeToSaveResponse(this.typeStructureService.update(typeStructure));
    } else {
      this.subscribeToSaveResponse(this.typeStructureService.create(typeStructure));
    }
  }

  private createFromForm(): ITypeStructure {
    return {
      ...new TypeStructure(),
      id: this.editForm.get(['id']).value,
      label: this.editForm.get(['label']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeStructure>>) {
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
