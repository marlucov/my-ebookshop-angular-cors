import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Book } from '../../types/book';
import { DecimalPipe, NgFor } from '@angular/common';
import { BookService } from '../../services/book/book.service';
import { Cart } from '../../types/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  standalone: true,
  imports: [NgFor, DecimalPipe]
})
export class CartComponent {
  books!: Book[];
  orderAmount!: number;

  constructor(private cartService: CartService, private bookService: BookService) {
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart: Cart) => {
      this.books = cart.bookDtoList;
      this.orderAmount = this.books.map(book => book.price).reduce((sum, price) => (sum + price), 0);
    });
  }

  onClickRemoveBook(bookId: string): void {
    this.bookService.removeFromCart(bookId).subscribe(() => {
      this.ngOnInit()
    });
  }
}
