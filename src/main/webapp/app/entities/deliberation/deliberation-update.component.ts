import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IDeliberation, Deliberation } from 'app/shared/model/deliberation.model';
import { DeliberationService } from './deliberation.service';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { OrganismeService } from 'app/entities/organisme/organisme.service';
import { IInstance } from 'app/shared/model/instance.model';
import { InstanceService } from 'app/entities/instance/instance.service';

@Component({
  selector: 'jhi-deliberation-update',
  templateUrl: './deliberation-update.component.html'
})
export class DeliberationUpdateComponent implements OnInit {
  isSaving: boolean;

  organismes: IOrganisme[];

  instances: IInstance[];

  editForm = this.fb.group({
    id: [],
    label: [null, [Validators.required]],
    date: [null, [Validators.required]],
    creationDate: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected deliberationService: DeliberationService,
    protected organismeService: OrganismeService,
    protected instanceService: InstanceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ deliberation }) => {
      this.updateForm(deliberation);
    });
    this.organismeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOrganisme[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOrganisme[]>) => response.body)
      )
      .subscribe((res: IOrganisme[]) => (this.organismes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.instanceService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IInstance[]>) => mayBeOk.ok),
        map((response: HttpResponse<IInstance[]>) => response.body)
      )
      .subscribe((res: IInstance[]) => (this.instances = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(deliberation: IDeliberation) {
    this.editForm.patchValue({
      id: deliberation.id,
      label: deliberation.label,
      date: deliberation.date != null ? deliberation.date.format(DATE_TIME_FORMAT) : null,
      creationDate: deliberation.creationDate != null ? deliberation.creationDate.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      label: this.editForm.get(['label']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      creationDate:
        this.editForm.get(['creationDate']).value != null ? moment(this.editForm.get(['creationDate']).value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliberation>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackOrganismeById(index: number, item: IOrganisme) {
    return item.id;
  }

  trackInstanceById(index: number, item: IInstance) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
