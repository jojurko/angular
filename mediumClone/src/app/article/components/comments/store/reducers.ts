import { createFeature, createReducer, on, StateObservable } from "@ngrx/store";
import { CommentsStateInterface } from "../types/commentState.interface";
import { commentsActions } from "./actions";
import { routerNavigatedAction } from "@ngrx/router-store";

const initialState: CommentsStateInterface={
    isLoading: false,
    error: null,
    data: []
}

const commentsFeature = createFeature({
    name: 'comments',
    reducer: createReducer(
        initialState,
        on(commentsActions.getComments,(state)=>({
            ...state,
            isLoading: true
        })),
        on(commentsActions.getCommentsSuccess,(state, action)=>({
            ...state,
            isLoading: false,
            data: action.comments
        })),
        on(commentsActions.getCommentsFailure, (state, action)=>({
            ...state,
            isLoading: false,
            errors: action.errors
        })),
        on(commentsActions.deleteCommentSuccess, (state, action)=>({
            ...state,
            data: state.data.filter(comment=>comment.id!==action.id)
        })),
        on(commentsActions.postCommentSuccess, (state, action)=>({
            ...state,
            data: [...state.data,action.comment]
        })),
        on(commentsActions.postCommentFailure, (state, action)=>({
            ...state,
            errors: action.errors
        })),
        on(routerNavigatedAction,()=>initialState)
    )
})

export const {
    name: commentsFeatureKey,
    reducer: commentsReducer,
    selectIsLoading,
    selectError,
    selectData: selectCommentsData
} = commentsFeature