import { Component } from '@angular/core';
import { Book } from '../../types/book';
import { BookService } from '../../services/book/book.service';
import { BookComponent } from '../book/book.component';
import { NgFor } from '@angular/common';
import { NewBookFormComponent } from "../new-book-form/new-book-form.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpResponse } from '@angular/common/http';
import { doNothing } from '../../utils/miscellaneous';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  standalone: true,
  imports: [BookComponent, NgFor, NewBookFormComponent]
})
export class BooksComponent {
  books!: Book[];
  self!: BooksComponent;
  bookPagesUrl!: SafeResourceUrl;
  isNotOnShuffle!: boolean;

  constructor(private bookService: BookService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.self = this;
    this.isNotOnShuffle = true;
    this.sanitizeBookPagesUrl('');
    this.bookService.getAll().subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  deleteById(id: string): void {
    this.bookService.delete(id).subscribe(() => {
      alert('Book successfully deleted.');
      window.location.reload();
    });
  }

  showPages(id: string): void {
    this.bookService.getPages(id).subscribe((data: HttpResponse<Blob>) => {
      data.body ?
        (
          this.sanitizeBookPagesUrl(window.URL.createObjectURL(new Blob(
            [data.body], { type: data.headers.get('Content-Type') ?? 'application/octet-stream' }
          ))),
          this.isNotOnShuffle = false
        ) :
        doNothing();
    });
  }

  onClickCloseShuffle(): void {
    this.isNotOnShuffle = true;
  }

  private sanitizeBookPagesUrl(url: string): void {
    this.bookPagesUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
