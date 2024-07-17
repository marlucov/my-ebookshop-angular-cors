import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { Observable } from 'rxjs';
import { PublishingHouse } from '../../types/publishing-house';
import { publishingHousesLink } from '../../utils/links-paths-routes';

@Injectable({
  providedIn: 'root'
})
export class PublishingHouseService {
  constructor(private httpClient: HttpClient, private authorizationService: AuthorizationService) {
  }

  private options(): { headers: HttpHeaders | undefined } {
    return { headers: this.authorizationService.getAuthorization() };
  }

  getAll(): Observable<PublishingHouse[]> {
    return this.httpClient.get<PublishingHouse[]>(publishingHousesLink, this.options());
  }
}
