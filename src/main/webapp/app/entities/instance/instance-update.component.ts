import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IInstance, Instance } from 'app/shared/model/instance.model';
import { InstanceService } from './instance.service';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { OrganismeService } from 'app/entities/organisme/organisme.service';
import { IDeliberation } from 'app/shared/model/deliberation.model';
import { DeliberationService } from 'app/entities/deliberation/deliberation.service';

@Component({
  selector: 'jhi-instance-update',
  templateUrl: './instance-update.component.html'
})
export class InstanceUpdateComponent implements OnInit {
  isSaving: boolean;

  organismes: IOrganisme[];

  deliberations: IDeliberation[];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    nombreRepresentants: [null, [Validators.required]],
    nombreSuppleants: [null, [Validators.required]],
    organisme: [null, Validators.required],
    deliberations: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected instanceService: InstanceService,
    protected organismeService: OrganismeService,
    protected deliberationService: DeliberationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ instance }) => {
      this.updateForm(instance);
    });
    this.organismeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOrganisme[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOrganisme[]>) => response.body)
      )
      .subscribe((res: IOrganisme[]) => (this.organismes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.deliberationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDeliberation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDeliberation[]>) => response.body)
      )
      .subscribe((res: IDeliberation[]) => (this.deliberations = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(instance: IInstance) {
    this.editForm.patchValue({
      id: instance.id,
      nom: instance.nom,
      nombreRepresentants: instance.nombreRepresentants,
      nombreSuppleants: instance.nombreSuppleants,
      organisme: instance.organisme,
      deliberations: instance.deliberations
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const instance = this.createFromForm();
    if (instance.id !== undefined) {
      this.subscribeToSaveResponse(this.instanceService.update(instance));
    } else {
      this.subscribeToSaveResponse(this.instanceService.create(instance));
    }
  }

  private createFromForm(): IInstance {
    return {
      ...new Instance(),
      id: this.editForm.get(['id']).value,
      nom: this.editForm.get(['nom']).value,
      nombreRepresentants: this.editForm.get(['nombreRepresentants']).value,
      nombreSuppleants: this.editForm.get(['nombreSuppleants']).value,
      organisme: this.editForm.get(['organisme']).value,
      deliberations: this.editForm.get(['deliberations']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInstance>>) {
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

  trackDeliberationById(index: number, item: IDeliberation) {
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
