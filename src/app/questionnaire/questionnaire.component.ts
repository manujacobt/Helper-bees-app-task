import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questionnaire',
  standalone: false,
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss'
})
export class QuestionnaireComponent {
  questionnaireForm: FormGroup;
  currentStep = 1;
  totalSteps = 5;
  progressValue = (this.currentStep / this.totalSteps) * 100;

  genres: string[] = [
    'Action', 'Horror', 'Drama', 'Thriller', 'Science Fiction', 'Fantasy',
    'Western', 'Romantic', 'Comedy', 'Kevin Hart Buddy Comedy', 'Noir', 'None of the above'
  ];
  experiences: string[] = ['0-3 years', '4-6 years', '7 or more years'];

  movieSnacks: string[] = ['Popcorn', 'Junior Mints', 'Skittles', 'Nachos', 'Milk Duds',
    'I only watch Criterion Collection films at Arthouse theaters that disallow snacks because there might be a crinkling sound that disrupts other patrons.'
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.questionnaireForm = this.fb.group({
      selectedGenres: this.fb.array([]),
      experience: [''],
      favoriteSnack: [''],
      favoriteMovies: this.fb.array([]),
      selectedFeatures: this.fb.array([]),
      address: this.fb.group({
        address1: [''],
        address2: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      })
    });
  }

  get selectedGenres(): FormArray {
    return this.questionnaireForm.get('selectedGenres') as FormArray;
  }

  get selectedFeatures(): FormArray {
    return this.questionnaireForm.get('selectedFeatures') as FormArray;
  }

  get favoriteMovies(): FormArray {
    return this.questionnaireForm.get('favoriteMovies') as FormArray;
  }

  addFavoriteMovie() {
    this.favoriteMovies.push(this.fb.group({
      title: [''],
      year: ['']
    }));
  }

  removeFavoriteMovie(index: number) {
    (this.favoriteMovies as FormArray).removeAt(index);
  }

  onCheckboxChange(event: any, formArray: FormArray) {
    if (event.target.checked) {
      formArray.push(this.fb.control(event.target.value));
    } else {
      const index = formArray.controls.findIndex(x => x.value === event.target.value);
      formArray.removeAt(index);
    }
  }

  onRadioChange(controlName: string, value: string) {
    this.questionnaireForm.patchValue({ [controlName]: value });
  }

  onNext() {
    console.log(this.questionnaireForm.value);
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateProgress();
    }
    else {
      const username = typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;
      Swal.fire({
        icon: 'success',
        title: 'Assessment Completed!',
        text: `Thank you, ${username}!`,
        timer: 2000,
        showConfirmButton: false
      });
      this.router.navigate(['/laststep']);
    }
  }


  onPrevious() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgress();
    }
  }

  updateProgress() {
    this.progressValue = (this.currentStep / this.totalSteps) * 100;
  }
}

