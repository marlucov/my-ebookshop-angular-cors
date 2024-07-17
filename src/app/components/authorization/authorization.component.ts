import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { homePath, routeRootChild } from '../../utils/links-paths-routes';
import { doNothing } from '../../utils/miscellaneous';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html'
})
export class AuthorizationComponent {
  private readonly queryParamAuthorizationToken: string = 'token';

  constructor(private route: ActivatedRoute, private router: Router) {
    const authorizationToken = this.route.snapshot.queryParamMap.get(this.queryParamAuthorizationToken);
    (null === authorizationToken) ?
      doNothing() :
      inject(AuthorizationService).authorize(authorizationToken);
  }

  ngOnInit(): void {
    this.router.navigate([routeRootChild(homePath)]);
  }
}
