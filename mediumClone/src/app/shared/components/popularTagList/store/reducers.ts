import { createFeature, createReducer, on } from "@ngrx/store";
import { PopularTagStateInterface } from "../types/popularTagsState.interface";
import { tagsActions } from "./actions";

const initialState: PopularTagStateInterface = {
    isLoading: false,
    error: null,
    data: null
}

const popularTagsFeature = createFeature({
    name: 'popularTag',
    reducer: createReducer(
        initialState,
        on(tagsActions.getPopularTags, (state)=>({
         ...state,
         isLoading: true   
        })),
        on(tagsActions.getPopularTagsSuccess, (state, action)=> ({
            ...state,
            isLoading: false,
            data: action.tags
        })),
        on(tagsActions.getPopularTagsFailure,(state)=>({
            ...state,
            isLoading: false
        }))
    )
})

export const {
    name: tagsFeatureKey,
    reducer: popularTagsReducer,
    selectIsLoading,
    selectError,
    selectData: selectPopularTagsData
} = popularTagsFeature