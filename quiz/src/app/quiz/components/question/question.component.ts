import { Component, inject } from "@angular/core";
import { AnswerComponent } from "../answer/answer.component";
import { QuizService } from "../../services/quiz.service";

@Component({
    selector: 'quiz-question',
    standalone: true,
    templateUrl: './question.component.html',
    styleUrl: './question.component.css',
    imports: [AnswerComponent]


})
export class QuestionComponent{
  quizService = inject(QuizService)
}