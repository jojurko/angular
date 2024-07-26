import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { combineLatest, filter, Subscription } from "rxjs";
import { selectCurrentUser } from "src/app/auth/store/reducers";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { BackendErrorMessages } from "../../../shared/components/backendErrorMessges/backendErrorMessages.component";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducers";
import { CurrentUserRequestInterface } from "src/app/shared/types/currentUserRequest.interface";
import { authActions } from "src/app/auth/store/actions";

@Component({
    selector: 'mc-setting',
    templateUrl:"./setting.component.html",
    standalone: true,
    imports: [BackendErrorMessages, CommonModule, ReactiveFormsModule]
})
export class SettingComponent implements OnInit, OnDestroy{

    form = this.fb.nonNullable.group({
        image: '',
        username: '',
        bio: '',
        email: '',
        password: ''
    })

    currentUser?: CurrentUserInterface
    currentUserSubscription?:Subscription

    data$ = combineLatest ({
        currentUser: this.store.select(selectCurrentUser),
        backendErrors: this.store.select(selectValidationErrors),
        isSubmitting: this.store.select(selectIsSubmitting)
    })

    constructor(private fb: FormBuilder, private store: Store) {      
    }

    ngOnInit() {
        this.currentUserSubscription = this.store.pipe(
            select(selectCurrentUser),
            filter(Boolean)
        ).subscribe(currentUser=>{
            this.currentUser = currentUser
            this.initialeForm()
        })
    }

    ngOnDestroy(): void {
        this.currentUserSubscription?.unsubscribe()
    }

    initialeForm():void {
        if (!this.currentUser) {
            throw new Error("current user is not set")
        }
        this.form.patchValue({
            image: this.currentUser.image??'',
            bio: this.currentUser.bio ?? '',
            username: this.currentUser.username,
            email:this.currentUser.email,
            password: ''
        })
    }

    submit():void {
        if (!this.currentUser) {
            throw new Error("current user is not set")
        }
        const currentUserRequest:CurrentUserRequestInterface =  {
            user: {
                ...this.currentUser,
                ...this.form.getRawValue()
            }
        }
        this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}))
    }

    logout():void {
        this.store.dispatch(authActions.logout())
    }

}