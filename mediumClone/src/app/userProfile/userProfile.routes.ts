import { Route } from "@angular/router";
import { UserProfileComponent } from "./components/userProfile.component";
import { UserProfileService } from "./services/userProfile.service";
import { provideState } from "@ngrx/store";
import { userProfileFeatureKey, userProfileReducer } from "./store/reducers";
import { provideEffects } from "@ngrx/effects";
import * as userProfileEffects from './store/effects'
import * as followUserProfile from "./components/followButton/store/effects"
import { FollowProfileService } from "./components/followButton/services/followProfile.service";

export const routes: Route[] = [{
    path:"",
    component: UserProfileComponent,
    providers: [UserProfileService, provideState(userProfileFeatureKey, userProfileReducer),
        provideEffects(userProfileEffects, followUserProfile),
        FollowProfileService
    ],
    
}]