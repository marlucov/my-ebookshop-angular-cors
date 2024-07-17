import { DecimalPipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../services/book/book.service';
import { Book } from '../../types/book';
import { BooksComponent } from '../books/books.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, DecimalPipe]
})
export class BookComponent {
  @Input() book!: Book;
  @Input() booksComponent!: BooksComponent;

  constructor(private bookService: BookService) {
  }

  onClickAddToCart(): void {
    this.bookService.addToCart(this.book.id).subscribe(() => {
      alert('Book successfully added to cart.')
    });
  }

  onClickShuffle(): void {
    this.booksComponent.showPages(this.book.id);
  }

  onClickDelete(): void {
    this.booksComponent.deleteById(this.book.id);
  }
}
