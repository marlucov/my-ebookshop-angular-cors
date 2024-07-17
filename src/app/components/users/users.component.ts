import { Component } from '@angular/core';
import { User } from '../../types/user';
import { UserService } from '../../services/user/user.service';
import { UserComponent } from '../user/user.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [UserComponent, NgFor]
})
export class UsersComponent {
  users!: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
