import { Component, inject, OnInit } from "@angular/core";
import { QuestionComponent } from "./components/question/question.component";
import { QuizService } from "./services/quiz.service";
import { CommonModule } from "@angular/common";
import { ResultPageComponent } from "./components/resultpage/resultPage.component";

@Component({
    selector: 'quiz',
    standalone: true,
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.css',
    imports: [QuestionComponent, CommonModule, ResultPageComponent]
})
export class QuizComponent implements OnInit{
  quizService = inject(QuizService)
  
  ngOnInit(): void {
    this.quizService.fetchQuestions();
  }
  
  start(): void {
    this.quizService.error.set(null)
    this.quizService.fetchQuestions();   
    this.quizService.restart()
  }  
}