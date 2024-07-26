import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { CommentComponent } from "../comment/comment.component";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { commentsActions } from "./store/actions";
import { selectCommentsData, selectError, selectIsLoading } from "./store/reducers";
import { BackendErrorMessages } from "../../../shared/components/backendErrorMessges/backendErrorMessages.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { CreateCommentComponent } from "../createComment/createComment.component";

@Component({
    selector: 'mc-comments-list',
    templateUrl: './comments.component.html',
    standalone: true,
    imports: [CommonModule, CommentComponent, BackendErrorMessages, LoadingComponent, CreateCommentComponent]
})
export class CommentsListComponent implements OnInit{

    @Input() slug:string = ""
    data$ = combineLatest ({
        isLoading: this.store.select(selectIsLoading),
        errors: this.store.select(selectError),
        comments: this.store.select(selectCommentsData)
    })

    constructor(private store: Store){}

    ngOnInit():void {
        this.store.dispatch(commentsActions.getComments({slug:this.slug}))
    }

}