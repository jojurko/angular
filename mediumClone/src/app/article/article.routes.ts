import { Route } from "@angular/router";
import { ArticleComponent } from "./components/article/article.component";
import { provideEffects } from "@ngrx/effects";
import * as articleEffects from './store/effects'
import * as commentEffets from './components/comments/store/effects'
import { provideState } from "@ngrx/store";
import { articleFeatureKey, articleReducer } from "./store/reducers";
import { ArticleService } from "./services/article.service";
import { commentsFeatureKey, commentsReducer } from "./components/comments/store/reducers";
import { CommentsService } from "./components/comments/services/comments.service";
export const articleRoutes: Route[] = [
    {
        path:'',
        component:ArticleComponent,
        providers:[
            provideEffects(articleEffects, commentEffets),
            provideState(articleFeatureKey, articleReducer),
            provideState(commentsFeatureKey, commentsReducer),
            ArticleService, CommentsService
        ]
    }
]