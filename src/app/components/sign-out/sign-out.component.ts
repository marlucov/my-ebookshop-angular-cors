import { Component, inject } from '@angular/core';
import { AuthorizationService } from '../../services/authorization/authorization.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html'
})
export class SignOutComponent {
  constructor() {
    inject(AuthorizationService).unauthorize();
  }
}
