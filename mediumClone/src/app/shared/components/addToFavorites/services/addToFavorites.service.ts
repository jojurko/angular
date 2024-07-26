import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment/environment";
import { map, Observable } from "rxjs";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { ArticleResponseInterface } from "src/app/shared/types/articleResponse.interface";

@Injectable()
export class AddToFavoritesService {
    constructor (private http:HttpClient){}

    addToFavorites(slug:string):Observable<ArticleInterface> {
        const url = this.getUrl(slug)
        return this.http.post<ArticleResponseInterface>(url, {})
        .pipe(map((response)=>response.article))
    }

    removeFromFavorites(slug: string) : Observable<ArticleInterface> {
        const url = this.getUrl(slug)
        return this.http.delete<ArticleResponseInterface>(url)
        .pipe(map((response)=>response.article))
    }

    getUrl(slug:string):string {
        return `${environment.apiUrl}/articles/${slug}/favorite`
    }
}