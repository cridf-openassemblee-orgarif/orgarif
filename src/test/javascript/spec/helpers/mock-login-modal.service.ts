import Spy = jasmine.Spy;

import { LoginModalService } from 'app/core/login/login-modal.service';
import { SpyObject } from './spyobject';

export class MockLoginModalService extends SpyObject {
  open: Spy;

  constructor() {
    super(LoginModalService);

    this.open = this.spy('open');
  }
}
