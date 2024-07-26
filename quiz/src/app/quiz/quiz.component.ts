import { Component, inject, OnInit } from "@angular/core";
import { QuestionComponent } from "./components/question/question.component";
import { QuizService } from "./services/quiz.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'quiz',
    standalone: true,
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.css',
    imports: [QuestionComponent, CommonModule]
})
export class QuizComponent implements OnInit{
  quizService = inject(QuizService)
  ngOnInit(): void {
    this.quizService.getQuestions().subscribe({
       next: questions=>this.quizService.question.set(questions),
      error:(err)=>
        this.quizService.error.set(err.message),
      })
  }
}