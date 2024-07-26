import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment/environment.development";
import { Observable, map } from "rxjs";
import { GetPopularTagsResponseInterface } from "../types/getPopularTagsResponse.interface";
import { PopularTagType } from "src/app/shared/types/popularTag.type";

@Injectable({
    providedIn: 'root'
})
export class PopularTagService {
    constructor(private http: HttpClient){    }
    getPopularTags() :Observable<PopularTagType[]>{
        const fullUrl = environment.apiUrl+"/tags";
        return this.http.get<GetPopularTagsResponseInterface>(fullUrl)
        .pipe(map((response)=>response.tags))
    }
}