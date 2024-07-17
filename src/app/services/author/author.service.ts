import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { Observable } from 'rxjs';
import { Author } from '../../types/author';
import { authorsLink } from '../../utils/links-paths-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  constructor(private httpClient: HttpClient, private authorizationService: AuthorizationService) {
  }

  private options(): { headers: HttpHeaders | undefined } {
    return { headers: this.authorizationService.getAuthorization() };
  }

  getAll(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(authorsLink, this.options());
  }
}
