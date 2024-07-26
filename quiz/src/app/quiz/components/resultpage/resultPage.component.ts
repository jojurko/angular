import { Component, inject, OnInit } from "@angular/core";
import { QuizService } from "../../services/quiz.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "quiz-result-page",
    templateUrl: './resultPage.component.html',
    styleUrls: ['../../quiz.component.css','./resultPage.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class ResultPageComponent implements OnInit{
    quizService = inject(QuizService)
    selectedCategory: number | null = null;

    ngOnInit(): void {
        this.quizService.fetchCategories()
    }

    start(formValue:any): void {
        const selectedCategoryId = formValue.category;
        if (selectedCategoryId!==null) {
            this.quizService.currentCategory.set(selectedCategoryId)
        }        
        this.quizService.fetchQuestions();
        this.quizService.restart()
      }
}