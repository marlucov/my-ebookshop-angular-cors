import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot, Routes } from '@angular/router';
import { authorizationPath, booksPath, cartPath, homePath, insertBookPath, loginLink, logoutPath, rootPath, usersPath } from './utils/links-paths-routes';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { BooksComponent } from './components/books/books.component';
import { CartComponent } from './components/cart/cart.component';
import { Code4xxComponent } from './components/code4xx/code4xx.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { inject } from '@angular/core';
import { AuthorizationService } from './services/authorization/authorization.service';
import { NewBookFormComponent } from './components/new-book-form/new-book-form.component';
import { navigateTo } from './utils/miscellaneous';

export const routes: Routes = [
  {
    path: rootPath,
    component: HeaderComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> =>
        inject(AuthorizationService).isAuthorized() ? true : (navigateTo(loginLink), false)
    ],
    children: [
      {
        path: booksPath,
        component: BooksComponent
      }
      , {
        path: cartPath,
        component: CartComponent
      }
      , {
        path: homePath,
        component: HomeComponent,
      }
      , {
        path: insertBookPath,
        component: NewBookFormComponent,
      }
      , {
        path: usersPath,
        component: UsersComponent
      }
    ]
  }
  , {
    path: authorizationPath,
    component: AuthorizationComponent
  }
  , {
    path: logoutPath,
    component: SignOutComponent
  }
  , {
    path: '**',
    component: Code4xxComponent
  }
];
