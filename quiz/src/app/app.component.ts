import { Component } from '@angular/core';
import { QuizComponent } from './quiz/quiz.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [QuizComponent],
})
export class AppComponent {
  
}
