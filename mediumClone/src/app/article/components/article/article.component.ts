import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { articleActions } from "../../store/actions";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { combineLatest, filter, map } from "rxjs";
import {
     selectArticleData,
     selectError,
     selectIsLoading } from "../../store/reducers";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { CommonModule } from "@angular/common";
import { TagListComponent } from "../../../shared/components/tagList/tagList.component";
import { ErrorMessageComponent } from "../../../shared/components/errorMessage/errorMessage.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { CommentsListComponent } from "../comments/comments.component";

@Component({
    selector: 'mc-article',
    templateUrl: './article.component.html',
    standalone: true,
    imports: [ CommonModule, TagListComponent, 
        ErrorMessageComponent, LoadingComponent, RouterLink, CommentsListComponent
    ]

})

export class ArticleComponent implements OnInit {
 
    slug = this.route.snapshot.paramMap.get('slug') ?? '';
    isAuthor$ = combineLatest ({
        article: this.store.select(selectArticleData),
        currentUser: this.store.select(selectCurrentUser).pipe(
            filter((currentUser): currentUser is CurrentUserInterface | null => 
            currentUser !== undefined)
        )
    }).pipe(
        map(({article, currentUser}) => {
            if (!article || !currentUser) return false;
            return article.author.username === currentUser.username
        })
    )
    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error : this.store.select(selectError),
        article: this.store.select(selectArticleData),
        isAuthor: this.isAuthor$
    })
    
    constructor (private store: Store, private route: ActivatedRoute){}
    ngOnInit(): void {
            this.store.dispatch(articleActions.getArticle({slug:this.slug}));
    }

    deleteArticle():void {
        this.store.dispatch(articleActions.deleteArticle({slug: this.slug}))
    }
}