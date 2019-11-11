import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRepresentant, Representant } from 'app/shared/model/representant.model';
import { RepresentantService } from './representant.service';
import { IElu } from 'app/shared/model/elu.model';
import { EluService } from 'app/entities/elu/elu.service';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { OrganismeService } from 'app/entities/organisme/organisme.service';
import { IInstance } from 'app/shared/model/instance.model';
import { InstanceService } from 'app/entities/instance/instance.service';

@Component({
  selector: 'jhi-representant-update',
  templateUrl: './representant-update.component.html'
})
export class RepresentantUpdateComponent implements OnInit {
  isSaving: boolean;

  elus: IElu[];

  organismes: IOrganisme[];

  instances: IInstance[];

  editForm = this.fb.group({
    id: [],
    position: [null, [Validators.required]],
    elu: [null, Validators.required],
    representantOrganisme: [],
    suppleantOrganisme: [],
    representantInstance: [],
    suppleantInstance: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected representantService: RepresentantService,
    protected eluService: EluService,
    protected organismeService: OrganismeService,
    protected instanceService: InstanceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ representant }) => {
      this.updateForm(representant);
    });
    this.eluService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IElu[]>) => mayBeOk.ok),
        map((response: HttpResponse<IElu[]>) => response.body)
      )
      .subscribe((res: IElu[]) => (this.elus = res), (res: HttpErrorResponse) => this.onError(res.message));
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

  updateForm(representant: IRepresentant) {
    this.editForm.patchValue({
      id: representant.id,
      position: representant.position,
      elu: representant.elu,
      representantOrganisme: representant.representantOrganisme,
      suppleantOrganisme: representant.suppleantOrganisme,
      representantInstance: representant.representantInstance,
      suppleantInstance: representant.suppleantInstance
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const representant = this.createFromForm();
    if (representant.id !== undefined) {
      this.subscribeToSaveResponse(this.representantService.update(representant));
    } else {
      this.subscribeToSaveResponse(this.representantService.create(representant));
    }
  }

  private createFromForm(): IRepresentant {
    return {
      ...new Representant(),
      id: this.editForm.get(['id']).value,
      position: this.editForm.get(['position']).value,
      elu: this.editForm.get(['elu']).value,
      representantOrganisme: this.editForm.get(['representantOrganisme']).value,
      suppleantOrganisme: this.editForm.get(['suppleantOrganisme']).value,
      representantInstance: this.editForm.get(['representantInstance']).value,
      suppleantInstance: this.editForm.get(['suppleantInstance']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepresentant>>) {
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

  trackEluById(index: number, item: IElu) {
    return item.id;
  }

  trackOrganismeById(index: number, item: IOrganisme) {
    return item.id;
  }

  trackInstanceById(index: number, item: IInstance) {
    return item.id;
  }
}
