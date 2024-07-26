import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PopularTagService } from "../services/popularTagList.service";
import { inject } from "@angular/core";
import { tagsActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { PopularTagType } from "src/app/shared/types/popularTag.type";

export const getPopularTagsEffect = createEffect(
    (actions$ =inject(Actions),
     popularTagService =inject(PopularTagService))=>{
        return actions$.pipe(
            ofType(tagsActions.getPopularTags),
            switchMap(()=>{
                return popularTagService.getPopularTags().pipe(
                map((popularTags:PopularTagType[])=>{
                    return tagsActions.getPopularTagsSuccess({tags:popularTags})
                }),
                    catchError(()=>{
                        return of(tagsActions.getPopularTagsFailure())
                    })
                )}
            ))},
    {functional: true}
)