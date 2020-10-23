import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDeliberation, Deliberation } from 'app/shared/model/deliberation.model';
import { DeliberationService } from './deliberation.service';

@Component({
  selector: 'jhi-deliberation-update',
  templateUrl: './deliberation-update.component.html',
})
export class DeliberationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    label: [null, [Validators.required]],
    date: [null, [Validators.required]],
    creationDate: [],
  });

  constructor(protected deliberationService: DeliberationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliberation }) => {
      if (!deliberation.id) {
        const today = moment().startOf('day');
        deliberation.date = today;
        deliberation.creationDate = today;
      }

      this.updateForm(deliberation);
    });
  }

  updateForm(deliberation: IDeliberation): void {
    this.editForm.patchValue({
      id: deliberation.id,
      label: deliberation.label,
      date: deliberation.date ? deliberation.date.format(DATE_TIME_FORMAT) : null,
      creationDate: deliberation.creationDate ? deliberation.creationDate.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deliberation = this.createFromForm();
    if (deliberation.id !== undefined) {
      this.subscribeToSaveResponse(this.deliberationService.update(deliberation));
    } else {
      this.subscribeToSaveResponse(this.deliberationService.create(deliberation));
    }
  }

  private createFromForm(): IDeliberation {
    return {
      ...new Deliberation(),
      id: this.editForm.get(['id'])!.value,
      label: this.editForm.get(['label'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliberation>>): void {
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
