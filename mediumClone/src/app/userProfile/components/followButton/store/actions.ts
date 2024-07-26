import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserProfileInterface } from "src/app/userProfile/types/userProfile.interface";

export const followProfileActions = createActionGroup({
    source: 'follow',
    events: {
        'Change follow': props<{following: boolean, slug: string}>(),
        'Change follow success': props<{profile: UserProfileInterface}>(),
        'Change follow failure': emptyProps()
    }
})