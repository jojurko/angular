import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment/environment.development";
import { map, Observable } from "rxjs";
import { GetUserProfileResponseInterface } from "src/app/userProfile/types/getUserProfileResponse.interface";
import { UserProfileInterface } from "src/app/userProfile/types/userProfile.interface";

@Injectable()
export class FollowProfileService {
    constructor (private http:HttpClient){}
    setFollow(slug: string) : Observable<UserProfileInterface> {
        const url = `${environment.apiUrl}/profiles/${slug}/follow`
        return this.http.post<GetUserProfileResponseInterface>(url,{})
        .pipe(map((response)=>response.profile))
    }

    removeFollow(slug:string) :Observable<UserProfileInterface> {
        const url = `${environment.apiUrl}/profiles/${slug}/follow`
        return this.http.delete<GetUserProfileResponseInterface>(url).pipe(map((response)=>response.profile))
    }

}