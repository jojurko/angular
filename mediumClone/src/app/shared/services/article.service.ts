import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment/environment.development";
import { Observable, map } from "rxjs";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { ArticleResponseInterface } from "src/app/shared/types/articleResponse.interface";

@Injectable ({
    providedIn: 'root'
})

export class ArticleService {
 constructor(private http: HttpClient){}

 getArticle(slug: string): Observable<ArticleInterface>{
    const fullUrl = `${environment.apiUrl}/articles/${slug}`
    return this.http.get<ArticleResponseInterface>(fullUrl)
    .pipe(map((response)=>response.article));
 }
}