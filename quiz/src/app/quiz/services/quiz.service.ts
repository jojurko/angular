import { computed, inject, Injectable, signal } from "@angular/core";
import { QuestionInterface } from "../types/question.interface";
import { catchError, map, Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BackendQuestionInterface } from "../types/backendQuestion.interface";
import { CategoryInterface } from "../types/category.interface";
import { BackendCategoriesInterface } from "../types/backendCategories.interface";

@Injectable({providedIn: 'root'})
export class QuizService {
  http = inject(HttpClient)
  error = signal<string|null>(null)
  question = signal<QuestionInterface[]> ([]);
  categories = signal<CategoryInterface[]>([])
  currentAnswer = signal<string|null>(null)
  currentCategory = signal<number|null>(null);
  correctAnswerCount = signal<number>(0)
  currentQuestionIndex=signal<number>(0)
  currentQuestion = computed(()=>this.question()[this.currentQuestionIndex()])
  currentQuestionAnswers = computed(
    ()=>this.shuffleAnswers(this.currentQuestion())
    )
  showResults = computed(
    ()=>this.currentQuestionIndex()=== this.question().length && this.question().length >0
  )

  fetchCategories():void {
    const apiUrl="https://opentdb.com/api_category.php"
    this.http.get<BackendCategoriesInterface>(apiUrl).pipe(
      tap(response=>this.categories.set(response.trivia_categories)),
      catchError( error => {this.error.set(error.message)
        return of([]);
      })
    ).subscribe()
  }

  fetchQuestions():void {
    this.question.set([])
    this.getQuestions().subscribe({
      next: questions=>this.question.set(questions),
     error:(err)=>
       this.error.set(err.message),
     })
  }

  getQuestions(): Observable<QuestionInterface[]> {
    const apiUrl="https://opentdb.com/api.php?amount=10&encode=url3986"
    let url
    if (this.currentCategory()) {
      url=apiUrl+`&category=${this.currentCategory()}`
    } else {
      url=apiUrl
    }
    console.log(url)
    return this.http.get<{results: BackendQuestionInterface[]}>(url).pipe(
      map(response=>this.normalizeQuestions(response.results))
    )
  }

  normalizeQuestions(backendQuestions: BackendQuestionInterface[]):QuestionInterface[] {
    
    return backendQuestions.map(backendQuestion => {
      const incorrectAnswers=backendQuestion.incorrect_answers.map(
        incorrect_answer=>decodeURIComponent(incorrect_answer)
      );
      return {
        question: decodeURIComponent(backendQuestion.question),
        correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
        incorrectAnswers
      }
    })
  }

  goToNextQuestion(): void {
    const currentQuestionIndex = this.showResults()?this.currentQuestionIndex():this.currentQuestionIndex()+1
    this.currentQuestionIndex.set(currentQuestionIndex)
    this.currentAnswer.set(null)
  }

  selectAnswer(answerText: string) :void {
    this.currentAnswer.set(answerText)
    const correctAnswerCount = answerText=== this.currentQuestion().correctAnswer ?
     this.correctAnswerCount()+1 :
     this.correctAnswerCount();
     this.correctAnswerCount.set(correctAnswerCount)
  }

  shuffleAnswers(question: QuestionInterface):string[] {
    const unshuffledAnswers =[
      question.correctAnswer,
      ...question.incorrectAnswers
    ]
    return unshuffledAnswers
    .map((ans)=>({sort:Math.random(), value: ans}))
    .sort((a,b) => a.sort - b.sort)
    .map((a)=>a.value)
  }

  restart(): void {
    this.currentQuestionIndex.set(0);
    this.correctAnswerCount.set(0);
  }
}