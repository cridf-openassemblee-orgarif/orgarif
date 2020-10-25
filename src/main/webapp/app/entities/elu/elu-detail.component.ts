import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IElu } from 'app/shared/model/elu.model';

@Component({
  selector: 'jhi-elu-detail',
  templateUrl: './elu-detail.component.html',
})
export class EluDetailComponent implements OnInit {
  elu: IElu | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ elu }) => (this.elu = elu));
  }

  previousState(): void {
    window.history.back();
  }
}
