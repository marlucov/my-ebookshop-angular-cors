import { Injectable } from '@angular/core';
import { logoutLink } from '../../utils/links-paths-routes';
import { HttpHeaders } from '@angular/common/http';
import { localStorageAuthorizationToken, navigateTo } from '../../utils/miscellaneous';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private authorization!: HttpHeaders | undefined;

  constructor() {
    this.authorize(localStorage.getItem(localStorageAuthorizationToken));
  }

  authorize(authorization: string | null): void {
    (null === authorization) ?
      (
        localStorage.removeItem(localStorageAuthorizationToken),
        this.authorization = undefined
      ) :
      (
        localStorage.setItem(localStorageAuthorizationToken, authorization),
        this.authorization = new HttpHeaders({ 'Authorization': authorization })
      );
  }

  unauthorize(): void {
    this.authorize(null);
    navigateTo(logoutLink);
  }

  getAuthorization(): HttpHeaders | undefined {
    return this.authorization;
  }

  isAuthorized(): boolean {
    return (undefined !== this.authorization);
  }
}
