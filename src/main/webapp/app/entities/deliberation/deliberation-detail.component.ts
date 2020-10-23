import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliberation } from 'app/shared/model/deliberation.model';

@Component({
  selector: 'jhi-deliberation-detail',
  templateUrl: './deliberation-detail.component.html',
})
export class DeliberationDetailComponent implements OnInit {
  deliberation: IDeliberation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliberation }) => (this.deliberation = deliberation));
  }

  previousState(): void {
    window.history.back();
  }
}
