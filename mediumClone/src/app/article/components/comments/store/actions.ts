import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CommentInterface } from "../types/comment.interface";
import { BackendErrorMessages } from "src/app/shared/components/backendErrorMessges/backendErrorMessages.component";
import { NewCommentInterface } from "../types/newComment.interface";

export const commentsActions = createActionGroup({
    source: 'comments',
    events: {
        'Get comments': props<{slug: string}>(),
        'Get comments success': props<{comments:CommentInterface[]}>(),
        'Get comments failure': props<{errors: BackendErrorMessages}>(),

        'Delete comment': props<{slug: string, id: number}>(),
        'Delete comment success': props<{id: number}>(),
        'Delete comment failure': emptyProps(),

        'Post comment': props<{slug: string, comment: NewCommentInterface}>(),
        'Post comment success': props<{comment: CommentInterface}>(),
        'Post comment failure': props<{errors: BackendErrorMessages}>()
    }
})