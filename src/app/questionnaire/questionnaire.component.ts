import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questionnaire',
  standalone: false,
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss'
})
export class QuestionnaireComponent {
  questionnaireForm: FormGroup;
  genres: string[] = [
    'Action', 'Horror', 'Drama', 'Thriller', 'Science Fiction', 'Fantasy',
    'Western', 'Romantic', 'Comedy', 'Kevin Hart Buddy Comedy', 'Noir', 'None of the above'
  ];
  progressValue = 20; // Initial progress value, change it as needed

  constructor(private fb: FormBuilder) {
    this.questionnaireForm = this.fb.group({
      selectedGenres: this.fb.array([])
    });
  }

  get selectedGenres(): FormArray {
    return this.questionnaireForm.get('selectedGenres') as FormArray;
  }

  onCheckboxChange(event: any) {
    const selectedGenres = this.selectedGenres;

    if (event.target.checked) {
      selectedGenres.push(this.fb.control(event.target.value));
    } else {
      const index = selectedGenres.controls.findIndex(x => x.value === event.target.value);
      selectedGenres.removeAt(index);
    }
  }

  onNext() {
    console.log(this.questionnaireForm.value);
    // Increase the progressValue as you navigate through the questions
    this.progressValue += 20; 
  }
}
