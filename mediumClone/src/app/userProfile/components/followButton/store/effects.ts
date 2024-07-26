import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { followProfileActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { FollowProfileService } from "../services/followProfile.service";
import { UserProfileInterface } from "src/app/userProfile/types/userProfile.interface";

export const setFollofProfileEffect = createEffect(
    (actions$ = inject(Actions), 
    followingProfileService = inject(FollowProfileService))=>{
        return actions$.pipe(
           ofType(followProfileActions.changeFollow),
           switchMap(({following, slug}) => {
            const profile$ = following ? 
            followingProfileService.setFollow(slug):
            followingProfileService.removeFollow(slug)
            return profile$.pipe(
                map((profile:UserProfileInterface)=>{
                    return followProfileActions.changeFollowSuccess({profile})
                }),
                catchError(()=>{
                    return of(followProfileActions.changeFollowFailure())
                })
            )            
           })
        )
    },
    {functional: true}
)