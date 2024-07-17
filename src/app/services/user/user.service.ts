import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../types/user';
import { userLink, usersLink } from '../../utils/links-paths-routes';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private authorizationService: AuthorizationService) {
  }

  private options(): { headers: HttpHeaders | undefined } {
    return { headers: this.authorizationService.getAuthorization() };
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(usersLink, this.options());
  }

  getCurrent(): Observable<User> {
    return this.httpClient.get<User>(userLink, this.options());
  }
}
