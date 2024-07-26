import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { followProfileActions } from "./store/actions";
import { selectCurrentUser } from "src/app/auth/store/reducers";

@Component({
    templateUrl: './followButton.component.html',
    selector: 'mc-follow-button',
    standalone: true,
    imports: [CommonModule]
})
export class FollowButtonComponent {
    @Input() isFollow:boolean = false
    @Input() profileSlug: string =""
    @Input() isCurrentUser: boolean=true

    constructor(private store: Store){}    

    follow():void{
        this.store.dispatch(followProfileActions.changeFollow({
            following: !this.isFollow,
            slug: this.profileSlug
        }))
        this.isFollow=!this.isFollow;
        console.log(this.isFollow)
    }
}