import { Component, computed, inject, input } from "@angular/core";
import { QuizService } from "../../services/quiz.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'quiz-answer',
    standalone: true,
    templateUrl: './answer.component.html',
    styleUrl: './answer.component.css',
    imports: [CommonModule]

})
export class AnswerComponent{
  quizService = inject(QuizService)
  answerText = input.required<string>()
  answerIndex  = input.required<number>()
  letterMapping =['A','B','C','D']

  isCorrectAnswer = computed(
    ()=> !!this.quizService.currentAnswer() && 
    this.answerText()===this.quizService.currentQuestion().correctAnswer
  );
  isWrongAnswer = computed(
    ()=>this.answerText()!==this.quizService.currentQuestion().correctAnswer 
    && this.answerText() == this.quizService.currentAnswer()
  )
}