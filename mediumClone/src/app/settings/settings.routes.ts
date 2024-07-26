import { Route } from "@angular/router";
import { SettingComponent } from "./components/settings/setting.component";
import { provideState } from "@ngrx/store";
import { seettingsReducer, settingsFeatureKey } from "./store/reducers";

export const routes: Route[] = [
    {
        path: '',
        component: SettingComponent,
        providers:[provideState(settingsFeatureKey, seettingsReducer)]
    }
]