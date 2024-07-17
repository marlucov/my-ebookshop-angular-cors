import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addBookLink, booksLink, deleteBookLink, getBookPagesLink, insertBookLink, removeBookLink } from '../../utils/links-paths-routes';
import { Book } from '../../types/book';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private httpClient: HttpClient, private authorizationService: AuthorizationService) {
  }

  private options(): { headers: HttpHeaders | undefined } {
    return { headers: this.authorizationService.getAuthorization() };
  }

  getAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(booksLink, this.options());
  }

  insert(book: Book): Observable<void> {
    return this.httpClient.post<void>(`${insertBookLink}`, book, this.options());
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${deleteBookLink}?id=${id}`, this.options());
  }

  addToCart(id: string): Observable<void> {
    return this.httpClient.patch<void>(`${addBookLink}?bookId=${id}`, undefined, this.options());
  }

  removeFromCart(id: string): Observable<void> {
    return this.httpClient.patch<void>(`${removeBookLink}?bookId=${id}`, undefined, this.options());
  }

  getPages(id: string): Observable<HttpResponse<Blob>> {
    return this.httpClient.get(`${getBookPagesLink}?id=${id}`, {
      headers: this.options().headers,
      responseType: 'blob',
      observe: 'response'
    });
  }
}
