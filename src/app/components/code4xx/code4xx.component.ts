import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-code4xx',
  templateUrl: './code4xx.component.html',
  styleUrl: './code4xx.component.scss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule]
})
export class Code4xxComponent {
  onClickGoBack() {
    window.history.back();
  }
}
