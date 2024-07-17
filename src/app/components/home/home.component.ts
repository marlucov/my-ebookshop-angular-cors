import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../types/user';
import { GreetedUser } from '../../types/greeted-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: GreetedUser = {
    firstName: '',
    lastName: ''
  };

  constructor(private userService: UserService) {
    this.userService.getCurrent().subscribe((user: User) => {
      this.user = {
        firstName: user.firstName,
        lastName: user.lastName
      };
    });
  }
}
