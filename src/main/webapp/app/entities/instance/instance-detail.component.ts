import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IInstance } from 'app/shared/model/instance.model';

@Component({
  selector: 'jhi-instance-detail',
  templateUrl: './instance-detail.component.html',
})
export class InstanceDetailComponent implements OnInit {
  instance: IInstance | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ instance }) => (this.instance = instance));
  }

  previousState(): void {
    window.history.back();
  }
}
