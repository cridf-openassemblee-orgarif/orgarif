import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAuditTrail, AuditTrail } from 'app/shared/model/audit-trail.model';
import { AuditTrailService } from './audit-trail.service';

@Component({
  selector: 'jhi-audit-trail-update',
  templateUrl: './audit-trail-update.component.html',
})
export class AuditTrailUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    entity: [],
    entityId: [],
    parentEntity: [],
    parentEntityId: [],
    action: [],
    user: [],
    date: [],
    details: [],
    updateDescription: [],
  });

  constructor(protected auditTrailService: AuditTrailService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ auditTrail }) => {
      if (!auditTrail.id) {
        const today = moment().startOf('day');
        auditTrail.date = today;
      }

      this.updateForm(auditTrail);
    });
  }

  updateForm(auditTrail: IAuditTrail): void {
    this.editForm.patchValue({
      id: auditTrail.id,
      entity: auditTrail.entity,
      entityId: auditTrail.entityId,
      parentEntity: auditTrail.parentEntity,
      parentEntityId: auditTrail.parentEntityId,
      action: auditTrail.action,
      user: auditTrail.user,
      date: auditTrail.date ? auditTrail.date.format(DATE_TIME_FORMAT) : null,
      details: auditTrail.details,
      updateDescription: auditTrail.updateDescription,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const auditTrail = this.createFromForm();
    if (auditTrail.id !== undefined) {
      this.subscribeToSaveResponse(this.auditTrailService.update(auditTrail));
    } else {
      this.subscribeToSaveResponse(this.auditTrailService.create(auditTrail));
    }
  }

  private createFromForm(): IAuditTrail {
    return {
      ...new AuditTrail(),
      id: this.editForm.get(['id'])!.value,
      entity: this.editForm.get(['entity'])!.value,
      entityId: this.editForm.get(['entityId'])!.value,
      parentEntity: this.editForm.get(['parentEntity'])!.value,
      parentEntityId: this.editForm.get(['parentEntityId'])!.value,
      action: this.editForm.get(['action'])!.value,
      user: this.editForm.get(['user'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      details: this.editForm.get(['details'])!.value,
      updateDescription: this.editForm.get(['updateDescription'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAuditTrail>>): void {
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
