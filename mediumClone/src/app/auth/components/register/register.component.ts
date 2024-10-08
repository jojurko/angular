import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import {Store} from "@ngrx/store"
import { authActions } from "../../store/actions";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducers";
import { combineLatest } from "rxjs";
import { BackendErrorMessages } from "src/app/shared/components/backendErrorMessges/backendErrorMessages.component";

@Component({
    selector: 'mc-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports:[ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages] //routerlink potrebujem na linky, commonmodule napriklad na pipe v html...

})
export class RegisterComponent{
    form = this.fb.nonNullable.group({
        username: ['',Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
    })
    /*isSubmitting$ = this.store.select(selectIsSubmitting) // zahrniem do data$, umoznuje mi to porom pracovat s lokalnymu v html: <ng-container * ngIf="data$ | async as data">
    backendErrors$= this.store.select(selectValidationErrors)*/
    data$=combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidationErrors)
})
    constructor(private fb:FormBuilder,
                private store:Store){}

    onSubmit(){
        console.log('form', this.form.getRawValue())
        const request: RegisterRequestInterface = {
            user: this.form.getRawValue()
        }    
        this.store.dispatch(authActions.register({request}))
    }
}