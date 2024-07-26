import { Component, Input} from "@angular/core";
import { CommentInterface } from "../comments/types/comment.interface";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { commentsActions } from "../comments/store/actions";

@Component({
    selector: 'mc-comment',
    templateUrl: './comment.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink],
})
export class CommentComponent {
    @Input() comment?: CommentInterface
    @Input() slug: string = ''

    constructor(private store: Store){}

    delete():void {
        if (this.comment)
            this.store.dispatch(commentsActions.deleteComment({slug: this.slug, id: this.comment.id}))
    }
}