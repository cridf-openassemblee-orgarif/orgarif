import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAuditTrail } from 'app/shared/model/audit-trail.model';

@Component({
  selector: 'jhi-audit-trail-detail',
  templateUrl: './audit-trail-detail.component.html',
})
export class AuditTrailDetailComponent implements OnInit {
  auditTrail: IAuditTrail | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ auditTrail }) => (this.auditTrail = auditTrail));
  }

  previousState(): void {
    window.history.back();
  }
}
