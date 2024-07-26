import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { FeedService } from "../services/feed.service"
import { feedActions } from "./actions"
import { GetFeedResponseInterface } from "../types/getFeedResponse.interface"
import { catchError, map, of, switchMap } from "rxjs"

export const getFeedEffects = createEffect(
    (actions$ = inject(Actions), 
    feedService = inject(FeedService),
  ) => {
      return actions$.pipe(
        ofType(feedActions.getFeed),
        switchMap(({url}) => {  //url ziskavam z akcie
          return feedService.getFeed(url).pipe(
            map((feed: GetFeedResponseInterface) => {
              return feedActions.getFeedSuccess({feed})
            }),
            catchError(()=> {
              return of(feedActions.getFeedFailure())
            })
          )
        })
      )
    },
    {functional: true}
  )