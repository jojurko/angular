import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { selectError } from "../comments/store/reducers";
import { BackendErrorMessages } from "src/app/shared/components/backendErrorMessges/backendErrorMessages.component";
import { CommonModule } from "@angular/common";
import { commentsActions } from "../comments/store/actions";
import { NewCommentInterface } from "../comments/types/newComment.interface";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'mc-post-comment',
    standalone: true,
    templateUrl: './createComment.component.html',
    imports: [BackendErrorMessages, CommonModule, ReactiveFormsModule]

})
export class CreateCommentComponent{
    @Input() slug:string=''

    data$ = combineLatest({
        errors: this.store.select(selectError)
    })

    form = this.fb.nonNullable.group({
        body: ''
    })

    constructor(private store: Store, private fb:FormBuilder){}

    post():void {
        const comment : NewCommentInterface=
         {comment: {body:this.form.getRawValue().body}}
        this.store.dispatch(commentsActions.postComment({slug: this.slug, comment: comment}))
        this.form.get('body')?.setValue("")
    }
}