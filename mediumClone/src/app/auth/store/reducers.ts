import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.intefcae";
import { authActions } from "./actions";
import { routerNavigationAction } from "@ngrx/router-store";

const initialState: AuthStateInterface = {
    isSubmitting:false,
    isLoading: false,
    currentUser: undefined,
    validationErrors: null
}
const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(initialState,
         on(authActions.register,(state)=>({
            ...state,
            isSubmitting:true,
            validationErrors: null
        })),
        on(authActions.registerSuccess,(state, action)=>({
            ...state,
            isSubmitting:false,
            currentUser: action.currentUser,
        })),
        on(authActions.registerFailure,(state, action)=>({
            ...state,
            isSubmitting:false,
            validationErrors: action.errors
        })),
        on(authActions.login,(state)=>({
            ...state,
            isSubmitting:true,
            validationErrors: null
        })),
        on(authActions.loginSuccess,(state, action)=>({
            ...state,
            isSubmitting:false,
            currentUser: action.currentUser,
        })),
        on(authActions.loginFailure,(state, action)=>({
            ...state,
            isSubmitting:false,
            validationErrors: action.errors
        })),
        on(authActions.getCurrentUser,(state)=>({
            ...state,
            isLoading:true,
        })),
        on(authActions.getCurrentUserSuccess,(state, action)=>({
            ...state,
            isLoading:false,
            currentUser: action.currentUser,
        })),
        on(authActions.getCurrentUserFailure,(state)=>({
            ...state,
            currentUser: null
        })),
        on(authActions.updateCurrentUserSuccess,(state, action)=>({
            ...state,
            isLoading:false,
            currentUser: action.currentUser,
        })),
        on(authActions.updateCurrentUserFailure,(state, action)=>({
            ...state,
            validationErrors: action.errors

        })),
        on(routerNavigationAction,(state)=>({
            ...state,
            validationErrors:null
        })),
        on(authActions.logout, (state)=>({
            ...state,
            ...initialState,
            currentUser: null
        }))
    )
})

export const {name:authFeatureKey, reducer: authReducer, selectIsSubmitting, selectCurrentUser, selectIsLoading, selectValidationErrors} = authFeature