import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInstance, Instance } from 'app/shared/model/instance.model';
import { InstanceService } from './instance.service';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { OrganismeService } from 'app/entities/organisme/organisme.service';
import { IDeliberation } from 'app/shared/model/deliberation.model';
import { DeliberationService } from 'app/entities/deliberation/deliberation.service';

type SelectableEntity = IOrganisme | IDeliberation;

@Component({
  selector: 'jhi-instance-update',
  templateUrl: './instance-update.component.html',
})
export class InstanceUpdateComponent implements OnInit {
  isSaving = false;
  organismes: IOrganisme[] = [];
  deliberations: IDeliberation[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    nombreRepresentants: [null, [Validators.required]],
    nombreSuppleants: [null, [Validators.required]],
    organisme: [null, Validators.required],
    deliberations: [],
  });

  constructor(
    protected instanceService: InstanceService,
    protected organismeService: OrganismeService,
    protected deliberationService: DeliberationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ instance }) => {
      this.updateForm(instance);

      this.organismeService.query().subscribe((res: HttpResponse<IOrganisme[]>) => (this.organismes = res.body || []));

      this.deliberationService.query().subscribe((res: HttpResponse<IDeliberation[]>) => (this.deliberations = res.body || []));
    });
  }

  updateForm(instance: IInstance): void {
    this.editForm.patchValue({
      id: instance.id,
      nom: instance.nom,
      nombreRepresentants: instance.nombreRepresentants,
      nombreSuppleants: instance.nombreSuppleants,
      organisme: instance.organisme,
      deliberations: instance.deliberations,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      nombreRepresentants: this.editForm.get(['nombreRepresentants'])!.value,
      nombreSuppleants: this.editForm.get(['nombreSuppleants'])!.value,
      organisme: this.editForm.get(['organisme'])!.value,
      deliberations: this.editForm.get(['deliberations'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInstance>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IDeliberation[], option: IDeliberation): IDeliberation {
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
