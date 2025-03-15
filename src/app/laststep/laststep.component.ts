import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-laststep',
  standalone: false,
  templateUrl: './laststep.component.html',
  styleUrl: './laststep.component.scss'
})
export class LaststepComponent {
  finishAssessment() {
    const username = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;
   Swal.fire({
                   icon: 'success',
                   title: 'Assessment Completed!',
                   text: `Thank you, ${username}!`,
                   timer: 2000,
                   showConfirmButton: false
                 });
  }
}
