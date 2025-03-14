import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  standalone: false,
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {

  constructor(private router: Router) {}

  startAssessment() {
    this.router.navigate(['/questionnaire']);
  }
}
