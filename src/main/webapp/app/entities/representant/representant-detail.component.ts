import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepresentant } from 'app/shared/model/representant.model';

@Component({
  selector: 'jhi-representant-detail',
  templateUrl: './representant-detail.component.html',
})
export class RepresentantDetailComponent implements OnInit {
  representant: IRepresentant | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ representant }) => (this.representant = representant));
  }

  previousState(): void {
    window.history.back();
  }
}
