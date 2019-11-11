import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepresentant } from 'app/shared/model/representant.model';

@Component({
  selector: 'jhi-representant-detail',
  templateUrl: './representant-detail.component.html'
})
export class RepresentantDetailComponent implements OnInit {
  representant: IRepresentant;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ representant }) => {
      this.representant = representant;
    });
  }

  previousState() {
    window.history.back();
  }
}
