import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { booksPath, cartPath, homePath, insertBookPath, logoutPath, routeFrom, routeRootChild, usersPath } from '../../utils/links-paths-routes';
import { RouterLinkWithLabel } from '../../types/router-link-with-label';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule]
})
export class HeaderComponent {
  books: RouterLinkWithLabel = {
    link: routeRootChild(booksPath),
    label: 'Books'
  };
  cart: RouterLinkWithLabel = {
    link: routeRootChild(cartPath),
    label: 'shopping_cart_checkout'
  };
  home: RouterLinkWithLabel = {
    link: routeRootChild(homePath),
    label: 'Home'
  };
  insertBook: RouterLinkWithLabel = {
    link: routeRootChild(insertBookPath),
    label: 'Insert Book'
  };
  logout: RouterLinkWithLabel = {
    link: routeFrom(logoutPath),
    label: 'Logout'
  };
  users: RouterLinkWithLabel = {
    link: routeRootChild(usersPath),
    label: 'Users'
  };
}
