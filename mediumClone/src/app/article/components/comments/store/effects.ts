import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { CommentsService } from "../services/comments.service"
import { commentsActions } from "./actions"
import { catchError, map, of, switchMap } from "rxjs"
import { CommentInterface } from "../types/comment.interface"
import { HttpErrorResponse } from "@angular/common/http"

export const getCommentsEffects = createEffect(
    (actions$ = inject(Actions), 
    commentService = inject(CommentsService),
  ) => {
      return actions$.pipe(
        ofType(commentsActions.getComments),
        switchMap(({slug}) => { 
          return commentService.fetchComments(slug).pipe(
            map((comments: CommentInterface[]) => {
              return commentsActions.getCommentsSuccess({comments})
            }),
            catchError((errorResponse:HttpErrorResponse)=> {
              return of(commentsActions.getCommentsFailure({errors:errorResponse.error.errors}))
            })
          )
        })
      )
    },
    {functional: true}
  )

  export const deleteCommentsEffects = createEffect(
    (actions$ = inject(Actions), 
    commentService = inject(CommentsService),
  ) => {
      return actions$.pipe(
        ofType(commentsActions.deleteComment),
        switchMap(({slug, id}) => { 
          return commentService.deleteComment(slug, id).pipe(
            map(() => {return commentsActions.deleteCommentSuccess({id})
            }),
            catchError((errorResponse:HttpErrorResponse)=> {
              return of(commentsActions.getCommentsFailure({errors:errorResponse.error.errors}))
            })
          )
        })
      )
    },
    {functional: true}
  )

  export const postCommentsEffects = createEffect(
    (actions$ = inject(Actions), 
    commentService = inject(CommentsService),
  ) => {
      return actions$.pipe(
        ofType(commentsActions.postComment),
        switchMap(({slug, comment}) => { 
          return commentService.postComment(slug, comment).pipe(
            map((comment) => {return commentsActions.postCommentSuccess({comment})
            }),
            catchError((errorResponse:HttpErrorResponse)=> {
              return of(commentsActions.postCommentFailure({errors:errorResponse.error.errors}))
            })
          )
        })
      )
    },
    {functional: true}
  )
