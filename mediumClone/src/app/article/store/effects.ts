import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { articleActions } from "./actions"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { ArticleService as SharedArticleService} from "src/app/shared/services/article.service"
import { ArticleService } from "../services/article.service"
import { ArticleInterface } from "src/app/shared/types/article.interface"
import { Router } from "@angular/router"

export const getArticleEffects = createEffect(
    (actions$ = inject(Actions), 
    articleService = inject(SharedArticleService),
  ) => {
      return actions$.pipe(
        ofType(articleActions.getArticle),
        switchMap(({slug}) => { 
          return articleService.getArticle(slug).pipe(
            map((article: ArticleInterface) => {
              return articleActions.getArticleSuccess({article})
            }),
            catchError(()=> {
              return of(articleActions.getArticleFailure())
            })
          )
        })
      )
    },
    {functional: true}
  )

  export const deleteArticleEffects = createEffect(
    (actions$ = inject(Actions), 
    articleService = inject(ArticleService),
  ) => {
      return actions$.pipe(
        ofType(articleActions.deleteArticle),
        switchMap(({slug}) => { 
          return articleService.deleteArticle(slug).pipe(
            map(() => {
              return articleActions.deleteArticleSuccess()
            }),
            catchError(()=> {
              return of(articleActions.deleteArticleFailure())
            })
          )
        })
      )
    },
    {functional: true}
  )

  export const redirectAfterDeleteArticleEffects = createEffect(
    (actions$ = inject(Actions), router=inject(Router) ) => {//nepotrebujem to riesit  v reduceri, kedze state nemenim
      return actions$.pipe(
        ofType(articleActions.deleteArticleSuccess),
        tap(()=>{
          router.navigateByUrl('/')
        })
      )
    },{functional: true, dispatch: false}
  )