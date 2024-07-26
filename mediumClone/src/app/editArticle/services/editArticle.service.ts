import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment/environment";
import { map, Observable } from "rxjs";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { ArticleRequestInterface } from "src/app/shared/types/articleRequest.interface";
import { ArticleResponseInterface } from "src/app/shared/types/articleResponse.interface";

@Injectable()
export class EditArticleService {
    constructor(private http: HttpClient) {}

    updateArticle(slug:string, 
        articleRequest:ArticleRequestInterface): Observable<ArticleInterface>{
        const fullUrl = `${environment.apiUrl}/articles/${slug}`
        return this.http.put<ArticleResponseInterface>(fullUrl, articleRequest)
        .pipe(map((response)=>response.article))
    }

}