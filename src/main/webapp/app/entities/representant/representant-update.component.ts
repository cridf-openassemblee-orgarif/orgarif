import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRepresentant, Representant } from 'app/shared/model/representant.model';
import { RepresentantService } from './representant.service';
import { IElu } from 'app/shared/model/elu.model';
import { EluService } from 'app/entities/elu/elu.service';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { OrganismeService } from 'app/entities/organisme/organisme.service';
import { IInstance } from 'app/shared/model/instance.model';
import { InstanceService } from 'app/entities/instance/instance.service';

type SelectableEntity = IElu | IOrganisme | IInstance;

@Component({
  selector: 'jhi-representant-update',
  templateUrl: './representant-update.component.html',
})
export class RepresentantUpdateComponent implements OnInit {
  isSaving = false;
  elus: IElu[] = [];
  organismes: IOrganisme[] = [];
  instances: IInstance[] = [];

  editForm = this.fb.group({
    id: [],
    position: [null, [Validators.required]],
    elu: [null, Validators.required],
    representantOrganisme: [],
    suppleantOrganisme: [],
    representantInstance: [],
    suppleantInstance: [],
  });

  constructor(
    protected representantService: RepresentantService,
    protected eluService: EluService,
    protected organismeService: OrganismeService,
    protected instanceService: InstanceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ representant }) => {
      this.updateForm(representant);

      this.eluService.query().subscribe((res: HttpResponse<IElu[]>) => (this.elus = res.body || []));

      this.organismeService.query().subscribe((res: HttpResponse<IOrganisme[]>) => (this.organismes = res.body || []));

      this.instanceService.query().subscribe((res: HttpResponse<IInstance[]>) => (this.instances = res.body || []));
    });
  }

  updateForm(representant: IRepresentant): void {
    this.editForm.patchValue({
      id: representant.id,
      position: representant.position,
      elu: representant.elu,
      representantOrganisme: representant.representantOrganisme,
      suppleantOrganisme: representant.suppleantOrganisme,
      representantInstance: representant.representantInstance,
      suppleantInstance: representant.suppleantInstance,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      position: this.editForm.get(['position'])!.value,
      elu: this.editForm.get(['elu'])!.value,
      representantOrganisme: this.editForm.get(['representantOrganisme'])!.value,
      suppleantOrganisme: this.editForm.get(['suppleantOrganisme'])!.value,
      representantInstance: this.editForm.get(['representantInstance'])!.value,
      suppleantInstance: this.editForm.get(['suppleantInstance'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepresentant>>): void {
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
}
