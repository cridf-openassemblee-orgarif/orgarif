import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInstance } from 'app/shared/model/instance.model';

@Component({
  selector: 'jhi-instance-detail',
  templateUrl: './instance-detail.component.html'
})
export class InstanceDetailComponent implements OnInit {
  instance: IInstance;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ instance }) => {
      this.instance = instance;
    });
  }

  previousState() {
    window.history.back();
  }
}
