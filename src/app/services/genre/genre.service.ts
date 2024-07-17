import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { Observable } from 'rxjs';
import { Genre } from '../../types/genre';
import { genresLink } from '../../utils/links-paths-routes';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  constructor(private httpClient: HttpClient, private authorizationService: AuthorizationService) {
  }

  private options(): { headers: HttpHeaders | undefined } {
    return { headers: this.authorizationService.getAuthorization() };
  }

  getAll(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(genresLink, this.options());
  }
}
