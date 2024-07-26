import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from '@angular/router';
import {provideEffects} from '@ngrx/effects'
import { provideState, provideStore} from '@ngrx/store'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import { appRoutes } from "./app/app.routes";
import { isDevMode } from "@angular/core";
import { authFeatureKey, authReducer } from "./app/auth/store/reducers";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import * as authEffects from './app/auth/store/effects'

import { provideRouterStore, routerReducer } from "@ngrx/router-store";
import { authInterceptor } from "./app/shared/services/authInterceptor";
import * as feedEffects from "./app/shared/components/feed/store/effects";
import * as tagsEffects from "./app/shared/components/popularTagList/store/effects"
import * as addFavoritesEffects from ".//app/shared/components/addToFavorites/store/effects"
import { feedFeatureKey, feedReducer } from "./app/shared/components/feed/store/reducers";
import { popularTagsReducer, tagsFeatureKey } from "./app/shared/components/popularTagList/store/reducers";
import { AddToFavoritesService } from "./app/shared/components/addToFavorites/services/addToFavorites.service";

bootstrapApplication(AppComponent, 
    {providers:[
        provideHttpClient(withInterceptors([authInterceptor])),
        provideRouter(appRoutes),
         provideStore({
            router: routerReducer
         }),
         provideRouterStore(), //instalovana na to, aby pri route mohli byt akcie, alebo efekty, v state viem kde som ..?
         provideState(authFeatureKey, authReducer),
         provideState(feedFeatureKey, feedReducer),
         provideState(tagsFeatureKey, popularTagsReducer),
         provideEffects(authEffects, feedEffects, tagsEffects, addFavoritesEffects),
         provideStoreDevtools({
            maxAge:25,
            logOnly: !isDevMode(),
            autoPause: true,
            trace: false,
            traceLimit: 75
         }),
         AddToFavoritesService
        ]
    })